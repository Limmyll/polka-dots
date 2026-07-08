/**
 * ui-result.js — 结果呈现页控制器
 *
 * 职责：
 * 1. 渲染完整人格报告（大字标题、标签、独白、分析、社交、自救）
 * 2. 调用雷达图与波点视觉渲染
 * 3. 生成分享长图卡片预览
 * 4. 处理重新测试与分享按钮
 */

const UIResult = (() => {

  /** DOM 缓存（延迟初始化，防止元素未就绪） */
  let $typeName      = null;
  let $enTitle       = null;
  let $typeSub       = null;
  let $visualImagery = null;
  let $tags          = null;
  let $monologue     = null;
  let $dimAnalysis   = null;
  let $dimBars       = null;
  let $socialGuide   = null;
  let $selfRescue    = null;
  let $shareCard     = null;

  /** 当前结果缓存（用于分享长图） */
  let _currentResult = null;
  let _currentScores = null;

  /**
   * 延迟获取 DOM 引用（每次 render 时确保元素存在）
   */
  function _ensureDom() {
    if (!$typeName) $typeName = document.getElementById('result-type-name');
    if (!$enTitle) $enTitle = document.getElementById('result-en-title');
    if (!$typeSub) $typeSub = document.getElementById('result-type-sub');
    if (!$visualImagery) $visualImagery = document.getElementById('result-visual-imagery');
    if (!$tags) $tags = document.getElementById('result-tags');
    if (!$monologue) $monologue = document.getElementById('result-monologue');
    if (!$dimAnalysis) $dimAnalysis = document.getElementById('result-dim-analysis');
    if (!$dimBars) $dimBars = document.getElementById('section-dim-bars');
    if (!$socialGuide) $socialGuide = document.getElementById('result-social-guide');
    if (!$selfRescue) $selfRescue = document.getElementById('result-self-rescue');
    if (!$shareCard) $shareCard = document.getElementById('result-share-card');

    // 验证关键 DOM
    const missing = [];
    if (!$typeName) missing.push('result-type-name');
    if (!$enTitle) missing.push('result-en-title');
    if (!$typeSub) missing.push('result-type-sub');
    if (missing.length > 0) {
      console.error('[UIResult] 缺少关键 DOM 元素:', missing);
      return false;
    }
    return true;
  }

  /**
   * 安全设置元素文本
   */
  function _safeText($el, text) {
    if ($el && text !== undefined && text !== null) {
      $el.textContent = String(text);
    } else if (!$el) {
      console.warn('[UIResult] DOM 元素不存在，跳过文本设置');
    }
  }

  /**
   * 安全设置元素 innerHTML
   */
  function _safeHTML($el, html) {
    if ($el && html !== undefined && html !== null) {
      $el.innerHTML = String(html);
    } else if (!$el) {
      console.warn('[UIResult] DOM 元素不存在，跳过 HTML 设置');
    }
  }

  /**
   * 渲染结果页
   * @param {Object} scores — 五维得分
   * @param {Object} result — 路由引擎返回的结果对象
   */
  function render(scores, result) {
    console.log('[UIResult] 开始渲染，结果类型:', result ? result.typeName : '❌ null');

    // 安全检查
    if (!result) {
      console.error('[UIResult] ❌ result 为 null/undefined，使用兜底结果');
      result = RESULT_TYPES.wild_pop;
    }
    if (!result.typeName) {
      console.error('[UIResult] ❌ result.typeName 缺失，使用兜底结果');
      result = RESULT_TYPES.wild_pop;
    }

    _currentResult = result;
    _currentScores = scores;

    // 确保 DOM 可用
    if (!_ensureDom()) {
      console.error('[UIResult] DOM 初始化失败，尝试延迟重试');
      setTimeout(() => {
        if (_ensureDom()) {
          _doRender(scores, result);
        }
      }, 100);
      return;
    }

    _doRender(scores, result);
  }

  /**
   * 实际渲染逻辑
   */
  function _doRender(scores, result) {
    // 大字标题
    _safeText($typeName, result.typeName);
    _safeText($enTitle, result.enTitle);
    _safeText($typeSub, result.typeSub);

    // 视觉意象
    _safeText($visualImagery, result.visualImagery);

    // 核心人格标签
    if ($tags && result.tags) {
      $tags.innerHTML = result.tags.map(t =>
        `<span class="result-tag">${t}</span>`
      ).join('');
    }

    // 诗性精神独白
    _safeText($monologue, result.coreMonologue);

    // 五维特征分析（纯文本）
    _safeHTML($dimAnalysis, `<p class="result-dim-text">${result.dimensionAnalysis || ''}</p>`);

    // 五维得分条（独立区域）
    if ($dimBars && scores) {
      $dimBars.innerHTML = renderDimBars(scores);
    }

    // 社交贴贴指南
    _safeHTML($socialGuide, formatSocialGuide(result.socialGuide || ''));

    // 专属生活自救建议
    _safeText($selfRescue, result.selfRescue);

    // 更新分享卡片
    updateShareCard(result);

    // 滚动到顶部
    const scrollContainer = document.querySelector('.result-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }

    console.log('[UIResult] 文本渲染全部完成 ✅');
  }

  /**
   * 渲染五维得分条
   */
  function renderDimBars(scores) {
    if (!scores) {
      console.warn('[UIResult] scores 为空，跳过得分条渲染');
      return '<p style="color:#D4687C;">得分数据未加载</p>';
    }

    const dims = [
      { key: 'presence',    label: '占位度', icon: '◉', desc: '社交存在感/表现欲' },
      { key: 'density',     label: '高密感', icon: '◉', desc: '思考深度/精神内耗' },
      { key: 'order',       label: '秩序力', icon: '◉', desc: '逻辑/规则依赖' },
      { key: 'margin',      label: '呼吸率', icon: '◉', desc: '边界感/松弛感' },
      { key: 'fluctuation', label: '浮游感', icon: '◉', desc: '跳跃思维/情绪波动' }
    ];

    let html = '<h3 class="result-section-title">五维得分明细</h3>';
    dims.forEach(d => {
      const score = (scores[d.key] !== undefined && scores[d.key] !== null)
        ? Math.round(scores[d.key])
        : 50;
      const level = score >= 75 ? 'high' : score >= 55 ? 'mid' : 'low';
      const levelLabel = score >= 75 ? '爆表' : score >= 55 ? '适中' : '偏低';
      html += `
        <div class="dim-bar-row">
          <div class="dim-bar-header">
            <span class="dim-bar-label">${d.icon} ${d.label}</span>
            <span class="dim-bar-desc">${d.desc}</span>
          </div>
          <div class="dim-bar-body">
            <div class="dim-bar-track">
              <div class="dim-bar-fill dim-bar--${level}" style="width:${score}%"></div>
            </div>
            <span class="dim-bar-score">${score}<span class="dim-bar-level">${levelLabel}</span></span>
          </div>
        </div>
      `;
    });
    return html;
  }

  /**
   * 格式化社交指南（高亮匹配类型名）
   */
  function formatSocialGuide(text) {
    if (!text) return '';
    return text
      .replace(/【(.+?)】/g, '<strong class="result-highlight">【$1】</strong>')
      .replace(/（(.+?)）/g, '<em class="result-em">（$1）</em>');
  }

  /**
   * 更新分享长图卡片（防御性 null 检查）
   */
  function updateShareCard(result) {
    if (!$shareCard) {
      console.warn('[UIResult] $shareCard 不存在，跳过分享卡片更新');
      return;
    }
    if (!result) {
      console.warn('[UIResult] result 为空，跳过分享卡片更新');
      return;
    }

    // 安全查询每个子元素
    const safeQuery = (sel) => {
      const el = $shareCard.querySelector(sel);
      if (!el) console.warn('[UIResult] 分享卡片缺少元素:', sel);
      return el;
    };

    const $ct = safeQuery('.share-card__type');
    const $ce = safeQuery('.share-card__en');
    const $cs = safeQuery('.share-card__sub');
    const $cta = safeQuery('.share-card__tags');
    const $cm = safeQuery('.share-card__monologue');

    if ($ct) $ct.textContent = result.typeName || '';
    if ($ce) $ce.textContent = result.enTitle || '';
    if ($cs) $cs.textContent = result.typeSub || '';
    if ($cta && result.tags) {
      $cta.innerHTML = result.tags.slice(0, 3).map(t =>
        `<span>${t}</span>`
      ).join('');
    }
    if ($cm && result.coreMonologue) {
      $cm.textContent = result.coreMonologue.slice(0, 80) + '…';
    }
  }

  /**
   * 初始化结果页按钮事件
   */
  function initButtons() {
    const $btnRetry = document.getElementById('btn-retry');
    const $btnShare = document.getElementById('btn-share');

    if ($btnRetry) {
      $btnRetry.addEventListener('click', () => {
        Calculator.reset();
        UIQuiz.init();
        UIState.switchTo('welcome');
      });
    } else {
      console.warn('[UIResult] btn-retry 元素不存在');
    }

    if ($btnShare) {
      $btnShare.addEventListener('click', () => {
        // 重新获取最新文本（可能已被 render 更新）
        const $tn = document.getElementById('result-type-name');
        const typeName = $tn ? $tn.textContent : '未知类型';
        const shareText = `我在《视觉人格：你的波点宇宙投影》中测出了「${typeName}」！快来测测你的波点人格吧～`;

        if (navigator.share) {
          navigator.share({ title: '视觉人格：你的波点宇宙投影', text: shareText })
            .catch(e => console.warn('[UIResult] 分享取消或失败:', e));
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(shareText).then(() => {
            alert('结果已复制到剪贴板，快去小红书分享吧！');
          }).catch(() => {
            alert(shareText);
          });
        } else {
          alert(shareText);
        }
      });
    } else {
      console.warn('[UIResult] btn-share 元素不存在');
    }
  }

  return { render, initButtons };
})();
