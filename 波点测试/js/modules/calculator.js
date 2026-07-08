/**
 * calculator.js — 积分累加器 & 得分计算引擎
 *
 * 职责：
 * 1. 初始化五维得分（初始均为 50 分）
 * 2. 根据用户选择的选项权重进行累加
 * 3. Clamp 得分到 0–100 区间
 * 4. 返回最终得分对象
 */

const Calculator = (() => {

  /** 初始得分（中庸起点） */
  const INITIAL = {
    presence: 50,
    density: 50,
    order: 50,
    margin: 50,
    fluctuation: 50
  };

  /** 当前累计得分 */
  let _scores = { ...INITIAL };

  /**
   * 重置得分
   */
  function reset() {
    _scores = { ...INITIAL };
  }

  /**
   * 累加一道题的选项权重
   * @param {Object} weight — 如 { presence: +10, density: -5, order: 0, margin: +3, fluctuation: -3 }
   */
  function applyWeight(weight) {
    DIMENSION_KEYS.forEach(key => {
      _scores[key] += (weight[key] || 0);
      // Clamp 到 0–100
      _scores[key] = Math.max(0, Math.min(100, _scores[key]));
    });
  }

  /**
   * 获取当前得分快照
   * @returns {Object}
   */
  function getScores() {
    return { ..._scores };
  }

  /**
   * 运行完整计算流程
   * @param {Array} answers — 12 个元素，每个元素是选项 index (0/1/2)
   * @returns {Object} { scores, result }
   */
  function compute(answers) {
    reset();
    QUESTIONS.forEach((q, i) => {
      const choice = answers[i];
      if (choice >= 0 && choice < q.options.length) {
        applyWeight(q.options[choice].weight);
      }
    });
    const finalScores = getScores();
    const result = routeResult(finalScores);
    return { scores: finalScores, result };
  }

  return { reset, applyWeight, getScores, compute };
})();
