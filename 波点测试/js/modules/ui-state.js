/**
 * ui-state.js — UI 状态机（Screen Router）
 *
 * 管理四个页面的切换与过渡动画：
 *  - welcome  欢迎页
 *  - quiz     答题页
 *  - loading  计算等待页
 *  - result   结果呈现页
 */

const UIState = (() => {

  const SCREENS = ['welcome', 'quiz', 'loading', 'result'];
  let _current = 'welcome';

  /** 切换到指定页面 */
  function switchTo(screenName) {
    if (!SCREENS.includes(screenName)) {
      console.warn(`[UIState] Unknown screen: ${screenName}`);
      return;
    }

    const oldEl = document.getElementById(`screen-${_current}`);
    const newEl = document.getElementById(`screen-${screenName}`);

    if (!oldEl || !newEl) return;

    // 旧页面淡出
    oldEl.classList.add('screen--exit');
    oldEl.classList.remove('screen--active');

    // 等待过渡完成后切换
    const onTransitionEnd = () => {
      oldEl.removeEventListener('transitionend', onTransitionEnd);
      oldEl.classList.remove('screen--exit');

      // 新页面淡入
      newEl.classList.add('screen--active', 'screen--enter');

      const onEnterEnd = () => {
        newEl.removeEventListener('transitionend', onEnterEnd);
        newEl.classList.remove('screen--enter');
      };
      newEl.addEventListener('transitionend', onEnterEnd);
    };

    oldEl.addEventListener('transitionend', onTransitionEnd);

    _current = screenName;
  }

  /** 获取当前页面名 */
  function current() {
    return _current;
  }

  return { switchTo, current };
})();
