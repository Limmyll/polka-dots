/**
 * ui-dots.js — 波点视觉动画渲染器
 *
 * 使用 Canvas 2D 自绘，根据 6 种结果类型的 visual 参数
 * 生成不同视觉风格的波点图案（大小、密度、排列、间距、动态、色彩主题）
 *
 * ⚠️ 鲁棒性：所有 Canvas 操作包裹 try-catch，
 *   即使波点动画失败，也不影响结果页文本的正常显示。
 */

const UIDots = (() => {

  let _animFrame = null;
  let _params = null;
  let _time = 0;

  /**
   * 绘制波点视觉
   * @param {Object} visual — 来自 result.visual 的参数
   */
  function draw(visual) {
    try {
      if (!visual) {
        console.warn('[UIDots] visual 参数为空，使用默认配置');
        visual = {
          dotSize: 'medium', density: 'medium', order: 'grid',
          margin: 'medium', fluctuation: 'medium', colorTheme: 'default'
        };
      }

      const canvas = document.getElementById('canvas-dot-visual');
      if (!canvas) {
        console.warn('[UIDots] canvas-dot-visual 元素不存在');
        return;
      }

      _params = visual;
      _time = 0;

      // 取消旧动画
      if (_animFrame) {
        cancelAnimationFrame(_animFrame);
        _animFrame = null;
      }

      // 获取父容器尺寸
      const parent = canvas.parentElement;
      if (!parent) {
        console.warn('[UIDots] Canvas 没有父容器');
        return;
      }

      const rect = parent.getBoundingClientRect();
      const W = rect.width || 300; // 降级默认宽度
      const H = rect.height || 200; // 降级默认高度

      if (W <= 0 || H <= 0) {
        console.warn('[UIDots] Canvas 父容器尺寸为 0×0，延迟重试…');
        // 延迟 300ms 重试
        setTimeout(() => draw(visual), 300);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('[UIDots] 无法获取 Canvas 2D 上下文');
        return;
      }
      ctx.scale(dpr, dpr);

      // 根据 visual 参数计算波点属性
      const cfg = getConfig(_params, W, H);

      if (!cfg.positions || cfg.positions.length === 0) {
        console.warn('[UIDots] 波点位置为空，跳过动画');
        // 至少画个纯色背景
        ctx.fillStyle = '#FFF0F3';
        ctx.fillRect(0, 0, W, H);
        return;
      }

      console.log('[UIDots] 开始绘制动画，波点数:', cfg.positions.length, '画布:', W + '×' + H);

      function animate() {
        try {
          ctx.clearRect(0, 0, W, H);

          // 绘制背景渐变
          const bgGrad = ctx.createLinearGradient(0, 0, W, H);
          bgGrad.addColorStop(0, cfg.bgColor1);
          bgGrad.addColorStop(0.5, cfg.bgColor2);
          bgGrad.addColorStop(1, cfg.bgColor3);
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, W, H);

          // 绘制波点
          for (let i = 0; i < cfg.positions.length; i++) {
            const pos = cfg.positions[i];
            if (!pos) continue;

            // 动态浮动偏移
            let dx = 0, dy = 0;
            if (cfg.fluctuationAmt > 0) {
              dx = Math.sin(_time * 0.02 + pos.x * 0.05) * cfg.fluctuationAmt;
              dy = Math.cos(_time * 0.025 + pos.y * 0.04) * cfg.fluctuationAmt;
            }

            // 动态大小脉动
            let r = pos.r;
            if (cfg.pulse && r > 0) {
              r += Math.sin(_time * 0.03 + i * 0.5) * cfg.pulseAmt;
              r = Math.max(1, r); // 防止半径变成负数
            }

            const x = pos.x + dx;
            const y = pos.y + dy;

            // 光晕
            if (cfg.glow) {
              const glowGrad = ctx.createRadialGradient(x, y, r * 0.3, x, y, r * 2.8);
              glowGrad.addColorStop(0, cfg.glowColor);
              glowGrad.addColorStop(1, 'rgba(255,255,255,0)');
              ctx.fillStyle = glowGrad;
              ctx.beginPath();
              ctx.arc(x, y, r * 2.8, 0, Math.PI * 2);
              ctx.fill();
            }

            // 主体圆点（径向渐变）
            const dotGrad = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, r * 0.1, x, y, r);
            dotGrad.addColorStop(0, cfg.dotColorLight);
            dotGrad.addColorStop(0.6, cfg.dotColorMid);
            dotGrad.addColorStop(1, cfg.dotColor);

            // 透明度
            ctx.globalAlpha = cfg.dotOpacity;
            ctx.fillStyle = dotGrad;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }

          _time++;
          _animFrame = requestAnimationFrame(animate);
        } catch (frameErr) {
          console.error('[UIDots] 动画帧错误，停止动画:', frameErr.message);
          if (_animFrame) {
            cancelAnimationFrame(_animFrame);
            _animFrame = null;
          }
        }
      }

      animate();
      console.log('[UIDots] 波点动画启动成功 ✅');

    } catch (e) {
      console.error('[UIDots] 💥 波点视觉绘制失败（已隔离）:', e.message, e.stack);
    }
  }

  /**
   * 根据 visual 参数 + colorTheme 生成波点配置
   */
  function getConfig(visual, W, H) {
    // 确保 visual 各字段有默认值
    const v = visual || {};
    const dotSize = v.dotSize || 'medium';
    const density = v.density || 'medium';
    const order = v.order || 'grid';
    const fluctuation = v.fluctuation || 'medium';
    const margin = v.margin || 'medium';
    const colorTheme = v.colorTheme || 'default';

    const cfg = {
      positions: [],
      dotColor: '#FFB6C1',
      dotColorMid: '#FFA4BC',
      dotColorLight: '#FFDEE9',
      bgColor1: '#FFF0F3',
      bgColor2: '#FFEBF0',
      bgColor3: '#FFE0E8',
      glowColor: 'rgba(255,105,180,0.12)',
      fluctuationAmt: 0,
      pulse: false,
      pulseAmt: 0,
      glow: true,
      dotOpacity: 1
    };

    // 应用色彩主题
    applyColorTheme(cfg, colorTheme);

    // 波点大小映射
    const sizeMap = {
      tiny: [3, 7], small: [5, 10], medium: [8, 20],
      large: [15, 32], varied: [4, 28], varied_large: [10, 44]
    };
    const [minR, maxR] = sizeMap[dotSize] || [8, 20];

    // 间距（控制数量/密度）
    const densityMap = {
      very_low: 80, low: 55, medium: 35,
      medium_high: 22, high: 15, very_high: 9
    };
    const spacing = densityMap[density] || 35;

    // 排列方式
    const gridOrders = ['grid', 'layered_grid', 'sparse_grid', 'semi_grid', 'strict_grid'];
    const isGrid = gridOrders.includes(order);

    // 浮游感映射
    const fluctMap = {
      very_low: 0, low: 0.5, medium: 2,
      high: 5, very_high: 10
    };
    cfg.fluctuationAmt = fluctMap[fluctuation] || 2;

    // 脉动
    cfg.pulse = fluctuation === 'very_high' || fluctuation === 'high';
    cfg.pulseAmt = cfg.pulse ? 2.5 : 0;

    // 呼吸率（间距乘数）
    const marginMap = {
      tight: 0.85, medium: 1, wide: 1.3, very_wide: 1.6, uneven: 1
    };
    const marginMult = marginMap[margin] || 1;
    const finalSpacing = Math.max(5, spacing * marginMult); // 防止间距为 0

    // 透明度（失重水母）
    if (colorTheme === 'soft_pink_glow') {
      cfg.dotOpacity = 0.55;
      cfg.glow = true;
    }

    // 生成波点位置
    if (isGrid) {
      const cols = Math.max(1, Math.floor(W / finalSpacing));
      const rows = Math.max(1, Math.floor(H / finalSpacing));
      const offsetX = (W - cols * finalSpacing) / 2 + finalSpacing / 2;
      const offsetY = (H - rows * finalSpacing) / 2 + finalSpacing / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = offsetX + col * finalSpacing;
          let y = offsetY + row * finalSpacing;

          // 交错偏移
          if (order === 'layered_grid' || order === 'semi_grid') {
            if (row % 2 === 0) x += finalSpacing * 0.25;
          }

          cfg.positions.push({
            x, y,
            r: minR + Math.random() * (maxR - minR) * 0.4
          });
        }
      }
    } else {
      // 随机/爆炸/混沌排列
      const area = W * H;
      const cellArea = finalSpacing * finalSpacing;
      const count = Math.max(10, Math.floor(area / Math.max(cellArea, 1)));

      for (let i = 0; i < count; i++) {
        let x, y, r;

        if (order === 'explosive') {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.pow(Math.random(), 0.5) * Math.min(W, H) * 0.45;
          x = W / 2 + Math.cos(angle) * dist;
          y = H / 2 + Math.sin(angle) * dist;
          r = minR + Math.random() * (maxR - minR) * 1.2;
        } else if (order === 'chaotic') {
          x = Math.random() * W;
          y = Math.random() * H;
          r = minR + Math.random() * (maxR - minR);
        } else {
          x = Math.random() * W;
          y = Math.random() * H;
          r = minR + Math.random() * (maxR - minR) * 0.7;
        }

        // 确保坐标在画布内
        x = Math.max(r, Math.min(W - r, x));
        y = Math.max(r, Math.min(H - r, y));
        r = Math.max(1, r);

        cfg.positions.push({ x, y, r });
      }
    }

    return cfg;
  }

  /**
   * 应用色彩主题
   */
  function applyColorTheme(cfg, theme) {
    switch (theme) {
      case 'fluorescent_pink':
        cfg.dotColor = '#FF1493';
        cfg.dotColorMid = '#FF69B4';
        cfg.dotColorLight = '#FFD700';
        cfg.bgColor1 = '#FFF0F5';
        cfg.bgColor2 = '#FFE4EC';
        cfg.bgColor3 = '#FFD6E8';
        cfg.glowColor = 'rgba(255,20,147,0.18)';
        break;

      case 'hepb_blue':
        cfg.dotColor = '#6B8CAE';
        cfg.dotColorMid = '#89A5C4';
        cfg.dotColorLight = '#D4E0ED';
        cfg.bgColor1 = '#F5F7FA';
        cfg.bgColor2 = '#EEF2F7';
        cfg.bgColor3 = '#E8ECF2';
        cfg.glowColor = 'rgba(107,140,174,0.1)';
        break;

      case 'deep_purple':
        cfg.dotColor = '#7B4FBF';
        cfg.dotColorMid = '#9B6FDF';
        cfg.dotColorLight = '#D8C8F0';
        cfg.bgColor1 = '#F8F4FF';
        cfg.bgColor2 = '#F0E8FF';
        cfg.bgColor3 = '#E8D8F8';
        cfg.glowColor = 'rgba(123,79,191,0.12)';
        break;

      case 'soft_pink_glow':
        cfg.dotColor = '#FFB6C1';
        cfg.dotColorMid = '#FFC8D6';
        cfg.dotColorLight = '#FFEEF2';
        cfg.bgColor1 = '#FFFAFB';
        cfg.bgColor2 = '#FFF5F7';
        cfg.bgColor3 = '#FFEEF3';
        cfg.glowColor = 'rgba(255,182,193,0.2)';
        cfg.dotOpacity = 0.5;
        break;

      case 'bauhaus_contrast':
        cfg.dotColor = '#E8468A';
        cfg.dotColorMid = '#FF5C8A';
        cfg.dotColorLight = '#FFD1DC';
        cfg.bgColor1 = '#FFFAFC';
        cfg.bgColor2 = '#FFF0F5';
        cfg.bgColor3 = '#FFE8F0';
        cfg.glowColor = 'rgba(232,70,138,0.15)';
        break;

      case 'wild_pop':
        cfg.dotColor = '#FF4500';
        cfg.dotColorMid = '#FF69B4';
        cfg.dotColorLight = '#00E5FF';
        cfg.bgColor1 = '#FFF5F7';
        cfg.bgColor2 = '#FFEBF0';
        cfg.bgColor3 = '#FFE0E8';
        cfg.glowColor = 'rgba(255,105,180,0.2)';
        break;

      default:
        break;
    }
  }

  return { draw };
})();
