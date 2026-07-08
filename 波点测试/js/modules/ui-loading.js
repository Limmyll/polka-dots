/**
 * ui-loading.js — 计算等待页控制器
 *
 * 职责：管理 loading 动画的启停与文案轮播
 */

const UILoading = (() => {

  const loadingTexts = [
    '正在解析你的意识流密度…',
    '正在为你裁剪精神布料…',
    '正在校准你的五维人格光谱…',
    '正在绘制你的波点宇宙投影…',
    '正在匹配专属波点共振频率…',
    '即将揭晓你的灵魂波点形态…'
  ];

  let _timer = null;
  let _idx = 0;

  const $text = document.querySelector('.loading-text');

  function start() {
    _idx = 0;
    $text.innerHTML = loadingTexts[0] + '<span class="loading-ellipsis">...</span>';

    _timer = setInterval(() => {
      _idx = (_idx + 1) % loadingTexts.length;
      $text.innerHTML = loadingTexts[_idx] + '<span class="loading-ellipsis">...</span>';
    }, 900);
  }

  function stop() {
    if (_timer) {
      clearInterval(_timer);
      _timer = null;
    }
  }

  return { start, stop };
})();
