/**
 * app.js — 应用入口
 *
 * 初始化事件监听，绑定开始按钮，启动应用。
 * 所有模块均为 IIFE 模式，通过全局命名空间访问。
 */

(function () {
  'use strict';

  // ─── 欢迎页「开始测试」按钮 ───
  document.getElementById('btn-start').addEventListener('click', () => {
    Calculator.reset();
    UIQuiz.init();
    UIState.switchTo('quiz');
  });

  // ─── 结果页按钮初始化 ───
  UIResult.initButtons();

  console.log('%c🎨 视觉人格：你的波点宇宙投影 %c已就绪',
    'font-size:16px;color:#ff5a78;', 'color:#aaa;');
  console.log('%c架构版本 v3.0 — 6 大波点人格 × 双重高随机性路由算法 × 高密度结果报告',
    'font-size:11px;color:#666;');

})();
