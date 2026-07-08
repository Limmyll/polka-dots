/**
 * ui-quiz.js — 答题流转控制器
 *
 * 职责：
 * 1. 动态渲染当前题目与选项
 * 2. 管理进度条
 * 3. 记录用户答案
 * 4. 题间切换动画
 */

const UIQuiz = (() => {

  let _currentIndex = 0;
  let _answers = new Array(QUESTIONS.length).fill(-1); // -1 表示未作答
  let _isAnimating = false;

  /** DOM 缓存 */
  const $title   = document.getElementById('quiz-title');
  const $number  = document.getElementById('quiz-number');
  const $options = document.getElementById('quiz-options');
  const $card    = document.getElementById('quiz-card');
  const $fill    = document.getElementById('progress-fill');
  const $text    = document.getElementById('progress-text');

  /**
   * 初始化/重置答题状态
   */
  function init() {
    _currentIndex = 0;
    _answers = new Array(QUESTIONS.length).fill(-1);
    _isAnimating = false;
    render();
    updateProgress();
  }

  /**
   * 渲染当前题目
   */
  function render() {
    const q = QUESTIONS[_currentIndex];
    if (!q) return;

    $number.textContent = `Q${q.id}`;
    $title.textContent  = q.title;
    $options.innerHTML  = '';

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML = `<span class="quiz-option__label">${opt.label}</span><span class="quiz-option__text">${opt.text}</span>`;
      btn.addEventListener('click', () => onSelect(i));
      $options.appendChild(btn);
    });

    // 入场动画
    $card.classList.remove('quiz-card--enter');
    void $card.offsetWidth; // 强制 reflow
    $card.classList.add('quiz-card--enter');
  }

  /**
   * 选项点击处理
   */
  function onSelect(optionIndex) {
    if (_isAnimating) return;
    _isAnimating = true;

    // 记录答案
    _answers[_currentIndex] = optionIndex;

    // 高亮选中项
    const btns = $options.querySelectorAll('.quiz-option');
    btns.forEach((b, i) => {
      b.classList.toggle('quiz-option--selected', i === optionIndex);
      b.disabled = true;
    });

    // 延迟后切换到下一题
    setTimeout(() => {
      if (_currentIndex < QUESTIONS.length - 1) {
        _currentIndex++;
        render();
        updateProgress();
        _isAnimating = false;
      } else {
        // 所有题目完成 → 进入计算阶段
        finish();
      }
    }, 500);
  }

  /**
   * 更新进度条
   */
  function updateProgress() {
    const pct = ((_currentIndex) / QUESTIONS.length) * 100;
    $fill.style.width = `${pct}%`;
    $text.textContent = `${_currentIndex + 1} / ${QUESTIONS.length}`;
  }

  /**
   * 全部答完 → 触发结果计算并跳转
   */
  function finish() {
    _isAnimating = true;

    // 调试日志：输出用户答案数组
    console.log('[UIQuiz] 用户答案:', _answers);
    console.log('[UIQuiz] 有效答案数:', _answers.filter(a => a >= 0).length, '/', QUESTIONS.length);

    // 切换到 loading 页
    try {
      UIState.switchTo('loading');
    } catch (e) {
      console.error('[UIQuiz] 切换到 loading 页失败:', e);
    }

    try {
      UILoading.start();
    } catch (e) {
      console.error('[UIQuiz] Loading 启动失败:', e);
    }

    // 异步计算（3 秒延迟以展示完整的意识流 loading 动画）
    setTimeout(() => {
      try {
        console.log('[UIQuiz] ===== 开始计算 =====');

        // ── 步骤 1：计算得分 ──
        let scores, result;
        try {
          const computed = Calculator.compute(_answers);
          scores = computed.scores;
          result = computed.result;
          console.log('[UIQuiz] 最终得分:', JSON.stringify(scores, null, 2));
          console.log('[UIQuiz] 判定结果:', result ? result.typeName : '❌ undefined/null');
          console.log('[UIQuiz] 结果 ID:', result ? result.id : '❌ undefined/null');
        } catch (e) {
          console.error('[UIQuiz] 计算引擎崩溃:', e);
          // 降级：手动兜底
          scores = { presence: 50, density: 50, order: 50, margin: 50, fluctuation: 50 };
          result = RESULT_TYPES.wild_pop;
          console.warn('[UIQuiz] 已降级为默认兜底结果:', result.typeName);
        }

        // ── 步骤 2：安全检查 result 是否有效 ──
        if (!result || !result.typeName) {
          console.error('[UIQuiz] ❌ result 无效，强制使用兜底结果');
          result = RESULT_TYPES.wild_pop;
          console.log('[UIQuiz] 兜底结果:', result.typeName);
        }

        // ── 步骤 3：切换到结果页（先切换，确保 DOM 可见，再绘图） ──
        try {
          UIState.switchTo('result');
          console.log('[UIQuiz] 已切换到结果页');
        } catch (e) {
          console.error('[UIQuiz] 切换到结果页失败:', e);
        }

        // ── 步骤 4：渲染文本（优先，不依赖 Canvas） ──
        try {
          UIResult.render(scores, result);
          console.log('[UIQuiz] 文本渲染完成');
        } catch (e) {
          console.error('[UIQuiz] UIResult.render 崩溃:', e.message, e.stack);
        }

        // ── 步骤 5：绘制雷达图（包裹 try-catch，不影响其他模块） ──
        try {
          UIRadar.draw(scores);
          console.log('[UIQuiz] 雷达图绘制完成');
        } catch (e) {
          console.error('[UIQuiz] 雷达图绘制失败（已隔离，不影响主流程）:', e.message);
        }

        // ── 步骤 6：绘制波点视觉（包裹 try-catch，不影响其他模块） ──
        try {
          UIDots.draw(result.visual);
          console.log('[UIQuiz] 波点视觉绘制完成');
        } catch (e) {
          console.error('[UIQuiz] 波点视觉绘制失败（已隔离，不影响主流程）:', e.message);
        }

        // ── 步骤 7：停止 loading ──
        try {
          UILoading.stop();
        } catch (e) {
          console.error('[UIQuiz] Loading 停止失败:', e);
        }

        console.log('[UIQuiz] ===== 全部渲染完成 =====');

      } catch (fatalError) {
        // 终极兜底：如果以上全部失败，至少停止 loading 并显示错误提示
        console.error('[UIQuiz] 💥 致命错误（最终兜底触发）:', fatalError.message, fatalError.stack);
        try { UILoading.stop(); } catch (e) {}
        try { UIState.switchTo('result'); } catch (e) {}
        alert('渲染结果时遇到了意外问题，请截图控制台日志后刷新重试。');
      }
    }, 3000);
  }

  return { init, render };
})();
