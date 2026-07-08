/**
 * questions.js — 12 道测试题数据结构
 *
 * ============================================================
 * 五维人格属性定义 (0–100 分，初始值 50)
 * ============================================================
 * 1. 占位度 (presence)  — 社交存在感 / 波点大小
 * 2. 高密感 (density)   — 思考深度 / 波点密度
 * 3. 秩序力 (order)     — 逻辑规则 / 波点排列
 * 4. 呼吸率 (margin)    — 边界松弛 / 波点间距
 * 5. 浮游感 (fluctuation)— 跳跃思维 / 波点动态
 *
 * 权重范围：-15 ~ +15，最终被 clamp 到 0–100
 * ============================================================
 */

const QUESTIONS = [
  // ═══════════ Q1 ═══════════
  {
    id: 1,
    title: "如果你的灵魂此刻被允许变成一种声音，掉进平静的水里，你觉得会发出什么？",
    options: [
      { label: "A", text: "咕嘟一声！炸开一个巨大、突兀且不容忽视的水泡", weight: { presence: 15, density: -5, order: -5, margin: 10, fluctuation: 5 } },
      { label: "B", text: "细密如香槟的气泡，在水面泛起连绵不断的、神经质的沙沙声", weight: { presence: -5, density: 15, order: 5, margin: -10, fluctuation: 10 } },
      { label: "C", text: "啪嗒。极其清脆的单音，水面只泛起一圈一圈绝对平行的涟漪", weight: { presence: 5, density: -10, order: 15, margin: 15, fluctuation: -10 } },
    ]
  },
  // ═══════════ Q2 ═══════════
  {
    id: 2,
    title: "深夜失眠，你死死盯着房间的天花板，在你的想象中那里正在发生什么？",
    options: [
      { label: "A", text: "黑暗像浓稠的墨汁一样，大块大块、毫无章法地在头顶晕染开来", weight: { presence: 10, density: 5, order: -15, margin: -5, fluctuation: 15 } },
      { label: "B", text: "有无数个肉眼看不见的隐形小人，正踩着极其严丝合缝的鼓点在跳踢踏舞", weight: { presence: -5, density: 10, order: 20, margin: -10, fluctuation: -5 } },
      { label: "C", text: "什么都没有，只有无尽的留白，和空气在失重状态下缓慢地漂浮", weight: { presence: -15, density: -15, order: 0, margin: 20, fluctuation: 5 } },
    ]
  },
  // ═══════════ Q3 ═══════════
  {
    id: 3,
    title: "一只野生的猫咪突然打翻了你的墨水瓶，踩得满地都是黑脚印，你的第一本能是？",
    options: [
      { label: "A", text: "血压飙升！但一秒后突然觉得这些杂乱无章的脚印组成了一幅绝妙的野生抽象画", weight: { presence: 10, density: -5, order: -15, margin: 5, fluctuation: 20 } },
      { label: "B", text: "瞬间头大，立刻拿来纸巾，试图把那些破坏了地板原本洁净秩序的混乱脚印精准擦掉", weight: { presence: -5, density: 5, order: 20, margin: -5, fluctuation: -15 } },
      { label: "C", text: "叹口气，静静地蹲下来看着猫，心想：它活在它的世界里，我活在我的世界里，挺好", weight: { presence: -10, density: 10, order: -5, margin: 15, fluctuation: 0 } },
    ]
  },
  // ═══════════ Q4 ═══════════
  {
    id: 4,
    title: "走进一个挤满了陌生人的巨大派对或者喧闹广场，你通常会把自己安放在哪里？",
    options: [
      { label: "A", text: "绝对的正中央，哪怕不说话，我也要穿最亮眼的颜色，占领最大的视觉面积", weight: { presence: 20, density: -5, order: -5, margin: -10, fluctuation: 10 } },
      { label: "B", text: "隐身在最角落的沙发里，一边高频喝水一边在脑子里疯狂解构每一个路人的穿搭和心理", weight: { presence: -15, density: 20, order: 5, margin: -5, fluctuation: 5 } },
      { label: "C", text: "站在落地窗前看着窗外，在热闹的声浪中为自己划出一道透明的、谁也进不来的真空防御罩", weight: { presence: -5, density: -5, order: 5, margin: 20, fluctuation: -5 } },
    ]
  },
  // ═══════════ Q5 ═══════════
  {
    id: 5,
    title: "如果要在你的衣柜里挑一件最能代表你核心精神的衣服，那件衣服会挂在哪个位置？",
    options: [
      { label: "A", text: "绝对的正中央！剪裁夸张、颜色极其浓烈，哪怕不穿，也是我精神王国的镇店之宝", weight: { presence: 15, density: -5, order: -10, margin: 5, fluctuation: 15 } },
      { label: "B", text: "规规矩矩地收纳在防尘袋里，熨烫得没有一丝褶皱，线条利落，每一颗纽扣都扣得严丝合缝", weight: { presence: -5, density: 5, order: 20, margin: -5, fluctuation: -15 } },
      { label: "C", text: "藏在最角落的阴影里，柔软、宽松、洗得有点发白，那是只有我自己知道的绝对安全感", weight: { presence: -15, density: 10, order: -5, margin: 20, fluctuation: 5 } },
    ]
  },
  // ═══════════ Q6 ═══════════
  {
    id: 6,
    title: "你走在路上，突然看到前面的天空中飘过一个巨大、怪异、且正在不断变形的粉色泡泡，你会？",
    options: [
      { label: "A", text: "兴奋度拉满！立刻拿出手机疯狂拍照，并在脑子里瞬间蹦出五个奇思妙想的发散性文案", weight: { presence: 10, density: 5, order: -15, margin: -5, fluctuation: 20 } },
      { label: "B", text: "皱起眉头，试图用逻辑去解构它：这是哪个游乐园的营销手段？还是某种化学成分超标？", weight: { presence: -5, density: 15, order: 15, margin: -5, fluctuation: -15 } },
      { label: "C", text: "只是静静地看一眼，心想'好可爱啊'，然后继续走自己的路，把它当作生活里路过的一阵风", weight: { presence: -10, density: -10, order: 0, margin: 15, fluctuation: 5 } },
    ]
  },
  // ═══════════ Q7 ═══════════
  {
    id: 7,
    title: "当你在做一项非常投入的创作（比如写代码、做设计）时，你的书桌通常呈现出什么状态？",
    options: [
      { label: "A", text: "铺天盖地的混乱！各种草稿纸、零食袋、数码线交织，但我总能在混沌中精准找到要用的东西", weight: { presence: 10, density: -5, order: -20, margin: 10, fluctuation: 15 } },
      { label: "B", text: "极度舒适的秩序感。键盘、水杯、平板必须摆在固定的网格线上，桌面不允许出现任何杂物", weight: { presence: -5, density: 10, order: 25, margin: -10, fluctuation: -15 } },
      { label: "C", text: "桌上东西极少，大面积的留白，只有最核心的工具，高频思考都在脑子里默默完成", weight: { presence: -10, density: 15, order: 5, margin: 15, fluctuation: -5 } },
    ]
  },
  // ═══════════ Q8 ═══════════
  {
    id: 8,
    title: "如果你被赋予了一项超能力，可以随意裁剪掉你人生中的某种'冗余时刻'，你会剪掉什么？",
    options: [
      { label: "A", text: "剪掉所有不得不迎合别人、戴着面具在人群中做'合格社会人'的伪装时间", weight: { presence: -10, density: 5, order: -10, margin: 15, fluctuation: 15 } },
      { label: "B", text: "剪掉那些大脑突然宕机、没有产出、毫无逻辑和效率可言的'发呆废弃物时刻'", weight: { presence: 5, density: -10, order: 20, margin: -15, fluctuation: -10 } },
      { label: "C", text: "剪掉那些深夜里密密麻麻、无休止冒出来的精神内耗和神经质的胡思乱想", weight: { presence: 5, density: -20, order: 5, margin: 10, fluctuation: 5 } },
    ]
  },
  // ═══════════ Q9 ═══════════
  {
    id: 9,
    title: "如果此刻要在你的精神宇宙里举办一场盛大的个人派对，你最希望邀请谁来填满这个空间？",
    options: [
      { label: "A", text: "呼朋引伴！把所有认识的、不认识的有趣人类全叫来，把场子塞得满不透风、热火朝天", weight: { presence: 20, density: 15, order: -10, margin: -15, fluctuation: 10 } },
      { label: "B", text: "严格筛选。只邀请一两个能够进行灵魂高频共振的绝对知己，其他人多一个都觉得拥挤", weight: { presence: -10, density: 10, order: 5, margin: 20, fluctuation: -5 } },
      { label: "C", text: "谁也不请。我自己坐在那里，放着最喜欢的黑胶唱片，享受绝对属于我一个人的宇宙真空", weight: { presence: -20, density: -15, order: 5, margin: 25, fluctuation: 5 } },
    ]
  },
  // ═══════════ Q10 ═══════════
  {
    id: 10,
    title: "你在路上捡到了一本神秘的画册，翻开发现里面密密麻麻画满了圆点，你潜意识觉得这是？",
    options: [
      { label: "A", text: "某种古老星系的运转轨迹图，每一个点都是一颗正在疯狂自转、即将大爆炸的恒星", weight: { presence: 15, density: 5, order: -10, margin: 0, fluctuation: 20 } },
      { label: "B", text: "一份极其严密的莫尔斯密码本，里面藏着这个世界运行的底层逻辑和绝对秩序", weight: { presence: -5, density: 10, order: 25, margin: -5, fluctuation: -15 } },
      { label: "C", text: "某个无聊的人在漫长的下午，为了打发时间随手留下的、毫无意义但很美丽的呼吸碎片", weight: { presence: -10, density: -10, order: 0, margin: 15, fluctuation: 10 } },
    ]
  },
  // ═══════════ Q11 ═══════════
  {
    id: 11,
    title: "当生活或学业中突然砸过来一个毫无预兆的巨大变故时，你内心的秩序通常会如何演变？",
    options: [
      { label: "A", text: "瞬间炸裂！脑子里立刻陷入情绪风暴，但很快就能在这场混乱中蹦出全新的反击灵感", weight: { presence: 10, density: 10, order: -20, margin: -5, fluctuation: 25 } },
      { label: "B", text: "极度不适。强迫症发作，会拼尽全力试图用理智把脱轨的生活一点点搬回原本的既定轨道上", weight: { presence: 5, density: 5, order: 20, margin: -10, fluctuation: -15 } },
      { label: "C", text: "异常平静。内心的小黑屋瞬间关上门，'哦，这样啊'，启动全自动防御机制，冷眼旁观", weight: { presence: -15, density: -10, order: 5, margin: 20, fluctuation: 0 } },
    ]
  },
  // ═══════════ Q12 ═══════════
  {
    id: 12,
    title: "想象你现在正在亲手设计一颗专属于你的精神星球，你会在这颗星球的表面涂抹什么？",
    options: [
      { label: "A", text: "涂满大块大块、高饱和度、不容忽视的波普圆点，让整颗星球在宇宙里像霓虹灯一样闪耀", weight: { presence: 25, density: -5, order: -10, margin: 5, fluctuation: 15 } },
      { label: "B", text: "用针尖般的微型波点，极其细腻、严丝合缝地排列出极其复杂的、宏大的几何迷宫", weight: { presence: -5, density: 20, order: 20, margin: -15, fluctuation: -5 } },
      { label: "C", text: "大面积的浅粉与留白，零星散落几颗会呼吸的半透明水母波点，安静得只能听到风声", weight: { presence: -15, density: -15, order: 5, margin: 25, fluctuation: 10 } },
    ]
  },
];

// 所有维度键名常量
const DIMENSION_KEYS = ['presence', 'density', 'order', 'margin', 'fluctuation'];

// 维度中文名映射
const DIMENSION_LABELS = {
  presence:    '占位度',
  density:     '高密感',
  order:       '秩序力',
  margin:      '呼吸率',
  fluctuation: '浮游感'
};

// 维度英文别名（用于雷达图）
const DIMENSION_ALIAS = {
  presence:    'Presence',
  density:     'Density',
  order:       'Order',
  margin:      'Margin',
  fluctuation: 'Fluctuation'
};

// 维度描述
const DIMENSION_DESC = {
  presence:    '社交存在感、表现欲、能量场 → 波点大小',
  density:     '思考深度、情感细腻度、精神内耗 → 波点密度',
  order:       '逻辑、强迫症倾向、对规则的依赖 → 波点排列',
  margin:      '边界感、松弛感、个人空间需求 → 波点间距',
  fluctuation: '跳跃思维、情绪波动、不可预测性 → 波点动态'
};
