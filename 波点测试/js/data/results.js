/**
 * results.js — 结果判定路由引擎 & 6 大波点人格数据库
 *
 * ============================================================
 * 双重高随机性判定算法：
 * 基于"五维交叉得分"的路由判定，确保用户稍微选错
 * 一个选项就会得到完全不同的结果。
 *
 * 五维人格属性：
 *  - presence    占位度（社交存在感/表现欲）
 *  - density     高密感（思考深度/精神内耗）
 *  - order       秩序力（逻辑/规则依赖）
 *  - margin      呼吸率（边界感/松弛感）
 *  - fluctuation 浮游感（跳跃思维/情绪波动）
 *
 * 判定优先级：
 *  1. 草间弥生的狂热逃兵
 *  2. 法式冷感留白
 *  3. 微观世界的神经质像素
 *  4. 失重水母的半透明蒸发
 *  5. 包豪斯乐园的严丝合缝
 *  6. 错位时空的野生波普（兜底）
 * ============================================================
 */

/**
 * 结果类型定义（6 种波点人格）
 *
 * 每个结果包含：
 *  - id: 唯一标识
 *  - typeName: 波点类型名称
 *  - typeSub: 副标题/一句话概括
 *  - enTitle: 英文标题
 *  - visualImagery: 视觉意象描述
 *  - coreMonologue: 核心人格独白（诗性精神独白）
 *  - dimensionAnalysis: 五维特征分析
 *  - socialGuide: 社交贴贴指南
 *  - selfRescue: 专属生活自救建议
 *  - tags: 核心人格标签数组
 *  - visual: 波点视觉参数
 */
const RESULT_TYPES = {
  // ─── 1. 草间弥生的狂热逃兵 ───
  explosive_giant: {
    id: 'explosive_giant',
    typeName: '草间弥生的狂热逃兵',
    enTitle: 'The Explosive Giant Dot',
    typeSub: '一颗行走的核弹头，拒绝任何形式的被规训与被排列',
    visualImagery: '高饱和度多巴胺荧光粉、巨大、无序、具有毁灭性美感的戏剧化圆点',
    tags: ['行为艺术家', '高情感浓度', '逻辑跳跃', '拒绝被定义', '多巴胺荧光粉'],
    coreMonologue: '你不是在生活，你是在对这个世界进行一场高情感浓度的行为艺术。你的存在感是一颗行走的核弹头，脑子里每天都在上演一万部逻辑跳跃的科幻电影。你拒绝任何形式的被规训、被排列。你大笑、你大哭、你高频震荡，你活得像一滴不小心掉进纯白世界里最不服管教的、炸裂开来的浓墨。',
    dimensionAnalysis: '占位度爆表（渴望被看见但拒绝被定义）、浮游感极高（思维是一匹野马）、秩序力跌入谷底（讨厌表格、讨厌按部就班，混乱才是你的美学）。',
    socialGuide: '你的完美同频布料是【法式冷感留白】，她能用无尽的安静接住你所有的炸裂；千万别和【包豪斯乐园】做室友，他严丝合缝的强迫症会让你想把他的书桌彻底掀翻。',
    selfRescue: '宝贝，你高密度的奇思妙想是作弊般的生命力，但别把自己烧得太太干涸。当脑子里的细胞要爆炸时，去摸摸小动物，或者把手机关机3小时，在无序中给自己找个锚点。',
    visual: { dotSize: 'varied_large', density: 'medium_high', order: 'explosive', margin: 'tight', fluctuation: 'very_high', colorTheme: 'fluorescent_pink' }
  },

  // ─── 2. 法式冷感留白 ───
  cinematic_minimal: {
    id: 'cinematic_minimal',
    typeName: '法式冷感留白',
    enTitle: 'The Cinematic Minimalist Dot',
    typeSub: '赫本蓝的克制优雅，保持绝对安全距离的经典波点',
    visualImagery: '黑白或赫本蓝、等距、保持绝对安全距离、充满松弛感的中型经典波点',
    tags: ['精神老派', '高智感', '边界感', '情绪钟摆', '电影空镜'],
    coreMonologue: '你有着精神上的老派和高智感。你极度注重边界感，"保持等距"是你和这个世界相处最体贴的方式。你不随意迎合，也不故意刺人。你的情绪是有周期的，像老式钟摆一样精准。你讨厌廉价的感动和没有边界感的过度热情，对你来说，生活最好的状态就是电影镜头里大面积的空镜与留白。',
    dimensionAnalysis: '呼吸率极高（需要绝对的个人真空防御罩）、秩序力极高（内心有一把看不见的尺，优雅地自律）、占位度较低（冷眼旁观，不争不抢）。',
    socialGuide: '快去艾特你身边那个【草间弥生的狂热逃兵】，你是唯一能让他安静下来的特效药；离【微观神经质像素】远一点，他密密麻麻的焦虑会传染给你。',
    selfRescue: '保持冷感很酷，但也别把自己彻底冻住。偶尔允许一两颗不听话的异形波点撞进你的留白里，生活偶尔失控一下，其实蛮好玩的。',
    visual: { dotSize: 'medium', density: 'medium', order: 'grid', margin: 'wide', fluctuation: 'low', colorTheme: 'hepb_blue' }
  },

  // ─── 3. 微观世界的神经质像素 ───
  micro_pixel: {
    id: 'micro_pixel',
    typeName: '微观世界的神经质像素',
    enTitle: 'The High-Density Quantized Dot',
    typeSub: '肉眼看是纯色，放大后全是精密细节的像素级微型圆点',
    visualImagery: '超高密度、针尖大小、肉眼看是一片纯色、放大看全是细节的像素级微型圆点',
    tags: ['高密度思考者', '信息量超载', '敏感度爆表', '精密迷宫', '自转碎心'],
    coreMonologue: '你是究极高密度思考者，精神世界的"信息量超载"重度患者。你是一边吃着薯片发呆，一边在脑子里解构宇宙弦理论的人。你的敏感度爆表，别人无心的一句话能在你心里激起海啸，但表面上你只是静静地喝口水。你的心碎成了几亿个微小的圆，每一个都在疯狂自转，旁人很难走得进你那精密又脆弱的细节迷宫。',
    dimensionAnalysis: '高密感满分（精神内耗与思考高频震荡）、秩序力极高（试图用细节的完美来抵抗内心的不安全感）、呼吸率极低（脑子里塞得太满，没有留白）。',
    socialGuide: '你最需要【失重水母】的治愈，他能带你逃离高频自转的内耗；和【野生波普】在一起会让你抓狂，因为你理不顺他跳跃的线头。',
    selfRescue: '别再用放大镜去审视生活里的每一个像素点了，孩子！生活是用来过的，不是用来解构的。学着把视线拉远，你会发现那些让你内耗的细密针尖，其实只是一片好看的云。',
    visual: { dotSize: 'tiny', density: 'very_high', order: 'semi_grid', margin: 'tight', fluctuation: 'medium', colorTheme: 'deep_purple' }
  },

  // ─── 4. 失重水母的半透明蒸发 ───
  weightless_jelly: {
    id: 'weightless_jelly',
    typeName: '失重水母的半透明蒸发',
    enTitle: 'The Weightless Floating Dot',
    typeSub: '边缘模糊、散发着淡淡粉光、在失重中逐渐淡化的半透明渐变波点',
    visualImagery: '边缘模糊、像水烟圈或水母一样、散发着淡淡粉光、在失重中逐渐淡化的半透明渐变波点',
    tags: ['社会性隐身', '佛系随缘', '精神超脱', '自动蒸发', '灵魂外太空'],
    coreMonologue: '你处于当代大学生的究极状态——"社会性隐身"。你不是没有观点，你只是觉得"世界太吵闹，而我只想做一粒会呼吸的空气"。你佛系、随缘、精神极其超脱，擅长在任何高压环境下启动"自动蒸发机制"。经常发呆，灵魂常年在外太空游荡，活得像一只半透明的水母，自由、散漫、失重。',
    dimensionAnalysis: '呼吸率与浮游感双高（究极i人，精神世界无限大，物理世界只想躺平）、占位度与高密感极低（拒绝任何精神负荷，蒸发万岁）。',
    socialGuide: '和任何人都能完美兼容，因为你根本不和他们争夺生存空间。但你最适合去治愈【微观神经质像素】，帮他把塞满的脑子放空。',
    selfRescue: '蒸发状态虽然舒服，但非必要请勿彻底凝结哦。偶尔也要回地球表面看看，去吃一顿热气腾腾的火锅，把踩在云端上的脚往泥土里落一落。',
    visual: { dotSize: 'medium', density: 'low', order: 'relaxed', margin: 'very_wide', fluctuation: 'high', colorTheme: 'soft_pink_glow' }
  },

  // ─── 5. 包豪斯乐园的严丝合缝 ───
  strict_bauhaus: {
    id: 'strict_bauhaus',
    typeName: '包豪斯乐园的严丝合缝',
    enTitle: 'The Strict Bauhaus Dot',
    typeSub: '绝对等距、几何网格严密对齐、极具现代工业感与古典理性的撞色硬核波点',
    visualImagery: '绝对等距、几何网格严密对齐、极具现代工业感与古典理性的撞色硬核波点',
    tags: ['秩序守护者', '强迫症晚期', '古典主义', '逻辑铁壁', '排列组合大师'],
    coreMonologue: '你是秩序的终极守护者，强迫症的晚期患者。你的内心有一套极其严密的算法，书桌必须摆在格线上，衣柜必须按颜色深浅排列，人生的每一步最好都在既定计划内。你极其靠谱、极其古典主义，最讨厌虚无缥缈的意识流。在混乱的世界里，你用铁一般的理性和逻辑，为自己圈定了一个绝对不会出错的安全乐园。',
    dimensionAnalysis: '秩序力大爆表（没有谁能比你更懂排列组合）、浮游感极低（拒绝情绪化、拒绝脱轨）、占位度适中（用实力说话，不屑于花哨的张扬）。',
    socialGuide: '你需要【法式冷感留白】这种同样讲规矩的同类互相同情；离【草间弥生的狂热逃兵】和【野生波普】越远越好，他们的存在本身就是对你秩序系统的公然挑衅。',
    selfRescue: '靠谱是你的超能力，但别让规则变成了你的囚笼。人生的代码里偶尔出个 Bug，或者波点不小心歪了一像素，其实是宇宙在送给你开盲盒的惊喜。',
    visual: { dotSize: 'medium', density: 'medium', order: 'strict_grid', margin: 'medium', fluctuation: 'very_low', colorTheme: 'bauhaus_contrast' }
  },

  // ─── 6. 错位时空的野生波普 ───
  wild_pop: {
    id: 'wild_pop',
    typeName: '错位时空的野生波普',
    enTitle: 'The Wild Anarchist Dot',
    typeSub: '大大小小交织、色彩疯狂撞击、打破一切几何排列规则、具有反骨特征的野生波点',
    visualImagery: '大大小小交织、色彩疯狂撞击、打破一切几何排列规则、具有反骨特征的野生波点',
    tags: ['艺术家反骨仔', '抗格式化', '思维跳跃', '不可预测', '野生波普'],
    coreMonologue: '你是一个真正的艺术家型反骨仔。你的一生都在对抗"格式化"。你拒绝被任何标签定义，思维跳跃到连AI都追不上你的尾灯。你的情绪和灵感都是野生野长的，大波点里套着小波点，粉色里面撞着冷感绿。你最迷人的地方就在于你的"不可预测性"，你是一场美丽的意外，是错位时空里最狂野的波普艺术。',
    dimensionAnalysis: '浮游感爆表（反骨、思维跳跃、不可控）、秩序力负数（彻底打破规则）、高密感与占位度高频交替（时而狂热如火，时而冷漠如冰）。',
    socialGuide: '你是所有无聊灵魂的强心剂！快去把【包豪斯乐园】抓过来，带他体验一把不按计划行事的疯狂快感。',
    selfRescue: '野蛮生长是非常珍贵的天赋！但记得在疯狂发散奇思妙想的同时，别把自己的现实生活过成一团乱麻。稍微留一点点秩序用来应付这个世界，剩下的用来疯狂盛开。',
    visual: { dotSize: 'varied', density: 'high', order: 'chaotic', margin: 'uneven', fluctuation: 'very_high', colorTheme: 'wild_pop' }
  }
};

/**
 * 结果路由判定引擎 — 双重高随机性算法
 *
 * 基于"五维交叉得分"的路由判定，使用精确阈值匹配，
 * 按优先级从高到低依次判定，首个满足条件的即返回。
 * 确保用户稍微选错一个选项就可能得到完全不同的结果。
 *
 * ⚠️ 绝对兜底：无论如何都不会返回 undefined/null。
 *
 * @param {Object} scores — 五维最终得分
 * @returns {Object} 匹配到的结果类型对象（绝对非空）
 */
function routeResult(scores) {
  // ─── 输入安全检查 ───
  if (!scores || typeof scores !== 'object') {
    console.error('[routeResult] ❌ scores 参数无效:', scores);
    console.warn('[routeResult] 返回兜底结果: wild_pop');
    return RESULT_TYPES.wild_pop;
  }

  // 安全取值函数
  const s = (dim) => {
    const val = scores[dim];
    if (typeof val !== 'number' || isNaN(val)) {
      console.warn(`[routeResult] 维度 "${dim}" 值无效 (${val})，使用默认值 50`);
      return 50;
    }
    return Math.round(val); // 四舍五入，确保整数比较
  };

  // 打印最终得分用于调试
  console.log('[routeResult] 输入得分:', JSON.stringify(scores));
  console.log('[routeResult] 标准化得分:', {
    presence: s('presence'), density: s('density'), order: s('order'),
    margin: s('margin'), fluctuation: s('fluctuation')
  });

  // ════════════════════════════════════════════════════════════
  // 判定 1：草间弥生的狂热逃兵
  //   Presence >= 65 且 Fluctuation >= 60
  // ════════════════════════════════════════════════════════════
  if (s('presence') >= 65 && s('fluctuation') >= 60) {
    console.log('[routeResult] ✅ 命中判定 1: explosive_giant (草间弥生的狂热逃兵)');
    return RESULT_TYPES.explosive_giant;
  }
  console.log('[routeResult] 未命中判定 1: presence=' + s('presence') + ' fluctuation=' + s('fluctuation'));

  // ════════════════════════════════════════════════════════════
  // 判定 2：法式冷感留白
  //   Margin >= 65 且 Order >= 55
  // ════════════════════════════════════════════════════════════
  if (s('margin') >= 65 && s('order') >= 55) {
    console.log('[routeResult] ✅ 命中判定 2: cinematic_minimal (法式冷感留白)');
    return RESULT_TYPES.cinematic_minimal;
  }
  console.log('[routeResult] 未命中判定 2: margin=' + s('margin') + ' order=' + s('order'));

  // ════════════════════════════════════════════════════════════
  // 判定 3：微观世界的神经质像素
  //   Density >= 70 且 Order >= 60
  // ════════════════════════════════════════════════════════════
  if (s('density') >= 70 && s('order') >= 60) {
    console.log('[routeResult] ✅ 命中判定 3: micro_pixel (微观世界的神经质像素)');
    return RESULT_TYPES.micro_pixel;
  }
  console.log('[routeResult] 未命中判定 3: density=' + s('density') + ' order=' + s('order'));

  // ════════════════════════════════════════════════════════════
  // 判定 4：失重水母的半透明蒸发
  //   Margin >= 70 且 Fluctuation >= 60
  // ════════════════════════════════════════════════════════════
  if (s('margin') >= 70 && s('fluctuation') >= 60) {
    console.log('[routeResult] ✅ 命中判定 4: weightless_jelly (失重水母的半透明蒸发)');
    return RESULT_TYPES.weightless_jelly;
  }
  console.log('[routeResult] 未命中判定 4: margin=' + s('margin') + ' fluctuation=' + s('fluctuation'));

  // ════════════════════════════════════════════════════════════
  // 判定 5：包豪斯乐园的严丝合缝
  //   Order >= 75 且 Presence <= 45
  // ════════════════════════════════════════════════════════════
  if (s('order') >= 75 && s('presence') <= 45) {
    console.log('[routeResult] ✅ 命中判定 5: strict_bauhaus (包豪斯乐园的严丝合缝)');
    return RESULT_TYPES.strict_bauhaus;
  }
  console.log('[routeResult] 未命中判定 5: order=' + s('order') + ' presence=' + s('presence'));

  // ════════════════════════════════════════════════════════════
  // 判定 6：错位时空的野生波普（优先匹配）
  //   Fluctuation >= 65 且 Order <= 40
  // ════════════════════════════════════════════════════════════
  if (s('fluctuation') >= 65 && s('order') <= 40) {
    console.log('[routeResult] ✅ 命中判定 6: wild_pop (错位时空的野生波普)');
    return RESULT_TYPES.wild_pop;
  }
  console.log('[routeResult] 未命中判定 6: fluctuation=' + s('fluctuation') + ' order=' + s('order'));

  // ─── 兜底规则：如果以上 6 种均不满足 ───
  // 按最高维度倾向进行智能匹配，确保每个用户都有结果
  console.log('[routeResult] ⚠️ 前 6 种判定均未命中，进入智能兜底映射…');

  // 安全地排序
  let sorted;
  try {
    const entries = Object.entries({
      presence: s('presence'),
      density: s('density'),
      order: s('order'),
      margin: s('margin'),
      fluctuation: s('fluctuation')
    });
    sorted = entries.sort((a, b) => b[1] - a[1]);
  } catch (e) {
    console.error('[routeResult] 排序失败:', e.message);
    console.warn('[routeResult] 返回终极兜底: wild_pop');
    return RESULT_TYPES.wild_pop;
  }

  const topDim = sorted[0][0];
  const topScore = sorted[0][1];
  console.log('[routeResult] 最高维度:', topDim, '=', topScore);

  // 按最高维度做兜底映射
  let fallback;
  switch (topDim) {
    case 'presence':
      fallback = s('fluctuation') >= 50
        ? RESULT_TYPES.explosive_giant
        : RESULT_TYPES.wild_pop;
      break;

    case 'density':
      fallback = s('order') >= 50
        ? RESULT_TYPES.micro_pixel
        : RESULT_TYPES.explosive_giant;
      break;

    case 'order':
      fallback = s('presence') <= 50
        ? RESULT_TYPES.strict_bauhaus
        : RESULT_TYPES.cinematic_minimal;
      break;

    case 'margin':
      fallback = s('fluctuation') >= 50
        ? RESULT_TYPES.weightless_jelly
        : RESULT_TYPES.cinematic_minimal;
      break;

    case 'fluctuation':
      fallback = s('order') <= 50
        ? RESULT_TYPES.wild_pop
        : RESULT_TYPES.explosive_giant;
      break;

    default:
      console.error('[routeResult] 未知最高维度:', topDim);
      fallback = RESULT_TYPES.wild_pop;
      break;
  }

  // 最终安全检查：确保 fallback 不为 undefined
  if (!fallback) {
    console.error('[routeResult] ❌ 兜底映射返回了 undefined！强制使用 wild_pop');
    fallback = RESULT_TYPES.wild_pop;
  }

  console.log('[routeResult] 兜底结果:', fallback.typeName);
  return fallback;
}
