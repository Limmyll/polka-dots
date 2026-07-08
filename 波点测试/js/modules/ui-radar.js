/**
 * ui-radar.js — 五维雷达图绘制器（霓虹粉极客少女风）
 *
 * 使用 Chart.js 4.x 绘制五维人格雷达图
 * 五个维度：占位度 / 高密感 / 秩序力 / 呼吸率 / 浮游感
 * 视觉：霓虹粉色线条 × 半透明荧光填充 × 发光数据点
 *
 * ⚠️ 鲁棒性：所有 Chart.js 调用均包裹 try-catch，
 *   即使雷达图渲染失败，也不影响文本结果页的正常显示。
 */

const UIRadar = (() => {

  let _chartInstance = null;

  /**
   * 检查 Chart.js 是否已正确加载
   */
  function _checkChartAvailability() {
    if (typeof Chart === 'undefined') {
      console.error('[UIRadar] ❌ Chart.js 未加载！请检查 CDN 链接。');
      return false;
    }
    return true;
  }

  /**
   * 绘制雷达图
   * @param {Object} scores — 五维得分 { presence: 72, density: 58, ... }
   */
  function draw(scores) {
    try {
      // 前置检查
      if (!_checkChartAvailability()) {
        console.warn('[UIRadar] Chart.js 不可用，跳过雷达图绘制');
        return;
      }

      if (!scores) {
        console.warn('[UIRadar] scores 为空，跳过雷达图绘制');
        return;
      }

      const canvas = document.getElementById('canvas-radar');
      if (!canvas) {
        console.warn('[UIRadar] canvas-radar 元素不存在');
        return;
      }

      // 检查 Canvas 在 DOM 中是否可见（父容器可能 display:none）
      if (canvas.offsetParent === null && canvas.parentElement) {
        console.log('[UIRadar] Canvas 父容器不可见，等待下次重试…');
        // 延迟 200ms 重试（等待 CSS transition 完成）
        setTimeout(() => draw(scores), 200);
        return;
      }

      // 销毁旧图表
      if (_chartInstance) {
        try {
          _chartInstance.destroy();
        } catch (e) {
          console.warn('[UIRadar] 销毁旧图表失败:', e.message);
        }
        _chartInstance = null;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('[UIRadar] 无法获取 Canvas 2D 上下文');
        return;
      }

      // 检查 DIMENSION_KEYS 是否存在
      if (typeof DIMENSION_KEYS === 'undefined' || typeof DIMENSION_LABELS === 'undefined') {
        console.error('[UIRadar] DIMENSION_KEYS 或 DIMENSION_LABELS 未定义');
        return;
      }

      const labels = DIMENSION_KEYS.map(k => DIMENSION_LABELS[k] || k);
      const data = DIMENSION_KEYS.map(k => {
        const v = scores[k];
        return (typeof v === 'number' && !isNaN(v)) ? Math.round(v) : 50;
      });

      console.log('[UIRadar] 雷达图数据:', data);

      const gradientBg = 'rgba(255,105,180,0.2)';

      _chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [{
            label: '你的人格光谱',
            data: data,
            backgroundColor: gradientBg,
            borderColor: 'rgba(255, 20, 147, 0.85)',
            borderWidth: 2.5,
            borderJoinStyle: 'round',
            pointBackgroundColor: data.map(v =>
              v >= 75 ? 'rgba(255,20,147,1)'
              : v >= 55 ? 'rgba(255,105,180,1)'
              : 'rgba(255,164,188,1)'
            ),
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2.5,
            pointRadius: 5.5,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#FF1493',
            pointHoverBorderColor: '#FFF',
            pointHoverBorderWidth: 3,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(255,235,240,0.95)',
              titleColor: '#D4687C',
              bodyColor: '#4A3040',
              titleFont: { size: 13, weight: 'bold' },
              bodyFont: { size: 12 },
              padding: 12,
              cornerRadius: 10,
              displayColors: false,
              callbacks: {
                label: (ctx) => `${ctx.raw} 分`
              }
            }
          },
          scales: {
            r: {
              beginAtZero: false,
              min: 0,
              max: 100,
              ticks: {
                stepSize: 20,
                backdropColor: 'transparent',
                color: 'rgba(200,160,180,0.5)',
                font: { size: 9 },
                z: 1
              },
              grid: {
                color: 'rgba(255,164,188,0.12)',
                lineWidth: 1,
                circular: true
              },
              angleLines: {
                color: 'rgba(255,164,188,0.12)',
                lineWidth: 1
              },
              pointLabels: {
                color: 'rgba(212,104,124,0.85)',
                font: { size: 13, weight: 'bold', family: "'PingFang SC','Microsoft YaHei',sans-serif" }
              }
            }
          },
          animation: {
            duration: 1400,
            easing: 'easeOutQuart'
          }
        },
        plugins: [{
          id: 'neonGradient',
          beforeDraw(chart) {
            const { ctx: cctx, chartArea } = chart;
            if (!chartArea) return;
            cctx.save();
            const cx = (chartArea.left + chartArea.right) / 2;
            const cy = (chartArea.top + chartArea.bottom) / 2;
            const r = Math.min(chartArea.width, chartArea.height) / 2;
            const grad = cctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
            grad.addColorStop(0, 'rgba(255,105,180,0.04)');
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            cctx.fillStyle = grad;
            cctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
            cctx.restore();
          }
        }]
      });

      console.log('[UIRadar] 雷达图创建成功 ✅');

    } catch (e) {
      console.error('[UIRadar] 💥 雷达图绘制失败（已隔离）:', e.message, e.stack);
      // 不抛出异常，让外部调用者继续执行
    }
  }

  return { draw };
})();
