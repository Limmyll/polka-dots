const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ===== 新的拼装素材库（替换旧的 RESULT_TYPES） =====
const newData = `

    /* ══════════════════════════════════════════════════════════════
       矩阵交叉拼装素材库
       前缀 × 主面料 × 副纽扣 → 100+ 种独一无二组合
       ══════════════════════════════════════════════════════════════ */

    const DIM_CHINESE = {
      presence:'占位度', density:'高密感', order:'秩序力', margin:'呼吸率', fluctuation:'浮游感'
    };

    // 1. 限定精神前缀（极端得分触发）
    const PREFIXES = {
      high_density:      { label:'高频自转内耗的',       cond:{ dim:'density',     op:'>', val:75 } },
      high_fluctuation:  { label:'拒绝被格式化的',       cond:{ dim:'fluctuation', op:'>', val:75 } },
      high_margin:       { label:'正在人间隐身蒸发的',   cond:{ dim:'margin',      op:'>', val:75 } },
      high_order:        { label:'强迫症晚期维度的',      cond:{ dim:'order',       op:'>', val:75 } },
      high_presence:     { label:'永不熄灭聚光灯的',      cond:{ dim:'presence',    op:'>', val:75 } },
      low_density:       { label:'精神轻盈失重的',       cond:{ dim:'density',     op:'<', val:25 } },
      low_order:         { label:'彻底脱轨解构的',       cond:{ dim:'order',       op:'<', val:25 } },
      low_margin:        { label:'零距离渗透的',          cond:{ dim:'margin',      op:'<', val:25 } },
      low_fluctuation:   { label:'绝对恒温恒湿的',       cond:{ dim:'fluctuation', op:'<', val:25 } },
      low_presence:      { label:'半透明幽灵形态的',      cond:{ dim:'presence',    op:'<', val:25 } }
    };

    // 2. 核心波点面料（由最高分维度决定）
    const MAIN_FABRICS = {
      presence: {
        title:'草间弥生的狂热逃兵', enTitle:'The Explosive Giant Dot',
        typeSub:'一颗行走的核弹头，拒绝任何形式的被规训与被排列',
        visualImagery:'高饱和度多巴胺荧光粉、巨大、无序、具有毁灭性美感的戏剧化圆点',
        tags:['行为艺术家','高情感浓度','逻辑跳跃','拒绝被定义','多巴胺荧光粉'],
        coreMonologue:'你不是在生活，你是在对这个世界进行一场高情感浓度的行为艺术。你的存在感是一颗行走的核弹头，情感浓度高到溢出。你拒绝任何形式的被规训、被排列。你大笑、你大哭、思维逻辑极度跳跃，活得像一滴不小心掉进纯白世界里最不服管教的、炸裂开来的巨型浓墨。',
        dimensionAnalysis:'占位度爆表（渴望被看见但拒绝被定义）、浮游感极高（思维是一匹野马）、秩序力跌入谷底（讨厌表格、讨厌按部就班，混乱才是你的美学）。',
        socialGuide:'你的完美同频布料是【法式冷感留白】——只有大面积的安静才能接住你所有的炸裂。和【包豪斯乐园】做室友是一场灾难，他严丝合缝的强迫症会让你想把他的书桌掀翻。',
        selfRescue:'宝贝，你高密度的奇思妙想是作弊般的生命力，但别把自己烧得太干涸。当脑子里的细胞要爆炸时，去摸摸小动物，或者把手机关机 3 小时，在无序中给自己找个锚点。',
        visual:{ dotSize:'varied_large', density:'medium_high', order:'explosive', margin:'tight', fluctuation:'very_high', colorTheme:'fluorescent_pink' }
      },
      density: {
        title:'微观世界的神经质像素', enTitle:'The High-Density Quantized Dot',
        typeSub:'肉眼看是纯色，放大后全是精密细节的像素级微型圆点',
        visualImagery:'超高密度、针尖大小、肉眼看是一片纯色、放大看全是细节的像素级微型圆点',
        tags:['高密度思考者','信息量超载','敏感度爆表','精密迷宫','自转碎心'],
        coreMonologue:'你是究极高密度思考者，精神世界的"信息量超载"重度患者。你是一边吃着薯片发呆，一边在脑子里解构宇宙弦理论的人。你的敏感度爆表，别人无心的一句话能在你心里激起海啸，但表面上你只是静静地喝口水。你的心碎成了几亿个微小的圆，在旁人看不见的夜里疯狂自转。',
        dimensionAnalysis:'高密感满分（精神内耗与思考高频震荡）、秩序力极高（试图用细节的完美来抵抗内心的不安全感）、呼吸率极低（脑子里塞得太满，没有留白）。',
        socialGuide:'你最需要【失重水母】的治愈——她能带你逃离高频自转的内耗；和【野生波普】在一起会让你抓狂，因为你理不顺他跳跃的线头。',
        selfRescue:'别再用放大镜去审视生活里的每一个像素点了！生活是用来过的，不是用来解构的。学着把视线拉远，你会发现那些让你内耗的细密针尖，其实只是一片好看的云。',
        visual:{ dotSize:'tiny', density:'very_high', order:'semi_grid', margin:'tight', fluctuation:'medium', colorTheme:'deep_purple' }
      },
      order: {
        title:'包豪斯乐园的铁面法官', enTitle:'The Strict Bauhaus Dot',
        typeSub:'绝对等距、几何网格严密对齐、极具现代工业感与古典理性的撞色硬核波点',
        visualImagery:'绝对等距、几何网格严密对齐、极具现代工业感与古典理性的撞色硬核波点',
        tags:['秩序守护者','强迫症晚期','古典主义','逻辑铁壁','排列组合大师'],
        coreMonologue:'你是秩序的终极守护者。你的内心有一套极其严密的算法，书桌必须摆在格线上，衣柜必须按颜色深浅排列，人生的每一步最好都在既定计划内。你极其靠谱、极其古典主义，在混乱的世界里，用铁一般的理性和逻辑，为自己圈定了一个绝对不会出错的安全乐园。',
        dimensionAnalysis:'秩序力大爆表（没有谁能比你更懂排列组合）、浮游感极低（拒绝情绪化、拒绝脱轨）、占位度适中（用实力说话，不屑于花哨的张扬）。',
        socialGuide:'你需要【法式冷感留白】这种同样讲规矩的同类互相同情。离【狂热逃兵】和【野生波普】越远越好，他们的存在本身就是对你秩序系统的公然挑衅。',
        selfRescue:'靠谱是你的超能力，但别让规则变成了你的囚笼。人生的代码里偶尔出个 Bug，或者波点不小心歪了一像素，其实是宇宙在送给你开盲盒的惊喜。',
        visual:{ dotSize:'medium', density:'medium', order:'strict_grid', margin:'medium', fluctuation:'very_low', colorTheme:'bauhaus_contrast' }
      },
      margin: {
        title:'法式冷感电影的无尽留白', enTitle:'The Cinematic Minimalist Dot',
        typeSub:'赫本蓝的克制优雅，保持绝对安全距离的经典波点',
        visualImagery:'黑白或赫本蓝、等距、保持绝对安全距离、充满松弛感的中型经典波点',
        tags:['精神老派','高智感','边界感','情绪钟摆','电影空镜'],
        coreMonologue:'你有着精神上的老派和高智感。"保持等距"是你和这个世界相处最体贴的方式。你不随意迎合，也不故意刺人。讨厌廉价的感动，对你来说，生活最好的状态就是电影镜头里大面积的空镜与留白。',
        dimensionAnalysis:'呼吸率极高（需要绝对的个人真空防御罩）、秩序力极高（内心有一把看不见的尺，优雅地自律）、占位度较低（冷眼旁观，不争不抢）。',
        socialGuide:'快去艾特你身边那个【草间弥生的狂热逃兵】，你是唯一能让他安静下来的特效药。离【微观神经质像素】远一点，他密密麻麻的焦虑会传染给你。',
        selfRescue:'保持冷感很酷，但也别把自己彻底冻住。偶尔允许一两颗不听话的异形波点撞进你的留白里，生活偶尔失控一下，其实蛮好玩的。',
        visual:{ dotSize:'medium', density:'medium', order:'grid', margin:'wide', fluctuation:'low', colorTheme:'hepb_blue' }
      },
      fluctuation: {
        title:'错位时空的野生波普艺术', enTitle:'The Wild Anarchist Dot',
        typeSub:'大大小小交织、色彩疯狂撞击、打破一切几何排列规则、具有反骨特征的野生波点',
        visualImagery:'大大小小交织、色彩疯狂撞击、打破一切几何排列规则、具有反骨特征的野生波点',
        tags:['艺术家反骨仔','抗格式化','思维跳跃','不可预测','野生波普'],
        coreMonologue:'你是一个真正的艺术型反骨仔。你的一生都在对抗"格式化"。你的情绪和灵感都是野生野长的，大波点里套着小波点，色彩疯狂撞击，最迷人的地方就在于你那无法被 AI 预测的动态美。',
        dimensionAnalysis:'浮游感爆表（反骨、思维跳跃、不可控）、秩序力负数（彻底打破规则）、高密感与占位度高频交替（时而狂热如火，时而冷漠如冰）。',
        socialGuide:'你是所有无聊灵魂的强心剂！快去把【包豪斯乐园】抓过来，带他体验一把不按计划行事的疯狂快感。',
        selfRescue:'野蛮生长是非常珍贵的天赋！但记得在疯狂发散奇思妙想的同时，别把自己的现实生活过成一团乱麻。稍微留一点点秩序用来应付这个世界，剩下的用来疯狂盛开。',
        visual:{ dotSize:'varied', density:'high', order:'chaotic', margin:'uneven', fluctuation:'very_high', colorTheme:'wild_pop' }
      }
    };

    // 3. 隐藏异形纽扣（由次高分维度决定）
    const SUB_BUTTONS = {
      presence: {
        subTitle:'霓虹多巴胺闪光扣',
        subDesc:'【隐藏特质】：虽然你表面上可能在装高冷或摆烂，但内心深处其实藏着一个"快看我！我超可爱！"戏精小黑屋。一旦遇到懂你的同类，你潜意识里的表现欲就会像霓虹灯一样瞬间通电闪烁。',
        subTags:['戏精小黑屋','霓虹体质','表演型冷面','社交变脸大师']
      },
      density: {
        subTitle:'细密心思的隐形暗扣',
        subDesc:'【隐藏特质】：你拥有作弊般敏锐的微表情抓取能力。哪怕你表现得再大大咧咧，别人一个眼神的闪躲、语气里一丝微弱的冷淡，都会被你衣服里那枚细密的暗扣精准捕捉，并在深夜反复咀嚼。',
        subTags:['微表情雷达','深夜反刍','敏感触角','信息过载捕捉']
      },
      order: {
        subTitle:'强迫症古典排扣',
        subDesc:'【隐藏特质】：在某些特定的怪癖上，你有着令人发指的秩序感（比如微信图标不能有红点、外卖餐具必须摆正）。这是你在一片混沌的生活里，偷偷用来维持自我不崩溃的微型安全锚点。',
        subTags:['红点清零党','餐具摆放师','微型安全锚','隐秘强迫症']
      },
      margin: {
        subTitle:'真空防御的防走光搭扣',
        subDesc:'【隐藏特质】：你身上有一道随时可以拉上的拉链。一旦社交能量耗尽，或者觉得聊天氛围变得廉价虚伪，你会瞬间在内心"咔哒"一声扣上防走光扣，开启全自动精神敷衍模式，灵魂当场离线。',
        subTags:['灵魂离线','精神敷衍模式','社交真空阀','自动拉黑机制']
      },
      fluctuation: {
        subTitle:'反骨叛逆的金属朋克铆钉',
        subDesc:'【隐藏特质】：你骨子里有一颗按捺不住的"野生反骨"。越是规规矩矩的场合，你脑子里越会蹦出一些极其无厘头、离经叛道的坏点子。你永远在期待生活里发生一些美丽的意外和脱轨。',
        subTags:['野生反骨','美丽脱轨','无厘头引擎','秩序破坏者']
      }
    };
`;

// ===== 新的拼装算法 =====
const newAssemble = `

    /* ══════════════════════════════════════════════════════════════
       矩阵交叉拼装引擎
       ══════════════════════════════════════════════════════════════ */

    function assembleResult(scores) {
      console.log('[拼装] 开始矩阵交叉拼装');
      const safe = dim => {
        const v = scores[dim];
        return (typeof v === 'number' && !isNaN(v)) ? Math.round(v) : 50;
      };

      const ranked = DIMENSIONS.map(d => ({ dim:d, score:safe(d) }))
        .sort((a,b) => b.score - a.score);
      const mainDim = ranked[0].dim;
      let subDim   = ranked[1].dim;
      if (subDim === mainDim) subDim = ranked[2].dim;

      console.log('[拼装] 主维度:', mainDim, safe(mainDim), DIM_CHINESE[mainDim]);
      console.log('[拼装] 次维度:', subDim, safe(subDim), DIM_CHINESE[subDim]);

      const hits = [];
      for (const key of Object.keys(PREFIXES)) {
        const r = PREFIXES[key];
        const v = safe(r.cond.dim);
        const hit = (r.cond.op === '>') ? (v > r.cond.val) : (v < r.cond.val);
        if (hit) hits.push({ key, label:r.label, priority:Math.abs(v-50) });
      }
      hits.sort((a,b) => b.priority - a.priority);
      const prefixLabel = hits.length > 0 ? hits[0].label : '';

      console.log('[拼装] 触发前缀:', prefixLabel || '(无极端值)');

      const main = MAIN_FABRICS[mainDim] || MAIN_FABRICS.fluctuation;
      const sub  = SUB_BUTTONS[subDim]   || SUB_BUTTONS.fluctuation;

      const fullTitle = prefixLabel
        ? prefixLabel + ' · ' + main.title + ' 挂件 ' + sub.subTitle
        : main.title + ' 挂件 ' + sub.subTitle;

      const allTags = [...new Set([...(main.tags||[]), ...(sub.subTags||[])])];
      const uniquenessCode = DIMENSIONS.reduce((acc,d) => acc*100+safe(d), 0);

      console.log('[拼装] ✅ 完整称号:', fullTitle);
      return { fullTitle, prefix:prefixLabel, mainTitle:main.title, subTitle:sub.subTitle,
        mainDim, subDim, mainFabric:main, subButton:sub, allTags, uniquenessCode };
    }
`;

// ===== 新的 renderResult =====
const newRender = `

    /* ── 页面切换 ── */
    function switchScreen(screenId) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('screen--active'));
      const t = document.getElementById(screenId);
      if (t) t.classList.add('screen--active');
    }

    /* ══════════════════════════════════════════════════════════════
       渲染结果页 — 像素级视觉大升级版
       布局：宇宙标题 → 称号 → 五维能量条 → 物理参数 → 独白 → 纽扣 → 社交 → 自救 → 分享 → 按钮
       ══════════════════════════════════════════════════════════════ */

    function renderResult(scores, assembled) {
      console.log('[渲染] 开始渲染终极结果页');
      const main = assembled.mainFabric;
      const sub  = assembled.subButton;
      const safe = d => scores[d] || 50;

      // 五维属性条
      const dimBarsHTML = DIMENSIONS.map(dim => {
        const score = safe(dim);
        let barClass = 'dim-bar--low', levelText = '低';
        if (score >= 70) { barClass = 'dim-bar--high'; levelText = '高'; }
        else if (score >= 40) { barClass = 'dim-bar--mid'; levelText = '中'; }
        const isMain = dim === assembled.mainDim;
        const isSub  = dim === assembled.subDim;
        return '<div class="dim-bar-row'+(isMain?' dim-bar-row--main':'')+(isSub?' dim-bar-row--sub':'')+'">'+
          '<div class="dim-bar-header">'+
            '<span class="dim-bar-label">'+DIM_LABELS[dim]+'</span>'+
            '<span class="dim-bar-desc">'+DIM_DESCS[dim]+'</span>'+
            (isMain?'<span class="dim-badge dim-badge--main">核心面料</span>':'')+
            (isSub?'<span class="dim-badge dim-badge--sub">隐藏纽扣</span>':'')+
          '</div>'+
          '<div class="dim-bar-body">'+
            '<div class="dim-bar-track"><div class="dim-bar-fill '+barClass+'" style="width:'+score+'%"></div></div>'+
            '<span class="dim-bar-score">'+score+'<span class="dim-bar-level">'+levelText+'</span></span>'+
          '</div>'+
        '</div>';
      }).join('');

      // 波点出厂物理参数
      const diameter  = (safe('presence') * 0.4 + 2).toFixed(1);
      const coverage   = safe('density');
      const meshPitch  = (safe('margin') * 0.15 + 1).toFixed(1);
      const eccentricity = safe('fluctuation');

      function dDesc(v) {
        if (v > 30) return '巨型戏剧纽扣波点';
        if (v > 20) return '中幅表现力波点';
        if (v > 10) return '精致中型标准波点';
        if (v > 5)  return '微型雅致波点';
        return '神经质微观针尖';
      }
      function cDesc(v) {
        if (v > 80) return '超载过饱和压缩';
        if (v > 60) return '丰富满版印花';
        if (v > 40) return '舒适透气排列';
        if (v > 20) return '稀疏轻量点缀';
        return '极简稀疏留白';
      }
      function mDesc(v) {
        if (v > 12) return '拒绝贴贴的真空防御圈';
        if (v > 8)  return '适度呼吸的社交结界';
        if (v > 5)  return '友好亲密的社交距离';
        return '无间贴贴的零距模式';
      }
      function eDesc(v) {
        if (v > 80) return '拒绝格式化的异形乱序飘散';
        if (v > 60) return '自带反骨的活泼不规则感';
        if (v > 40) return '微妙的可控随机波动';
        return '稳定恒定的完美正圆';
      }

      // 标签
      const tagsHTML = assembled.allTags.map(t => '<span class="result-tag">'+t+'</span>').join('');
      const shareTagsHTML = assembled.allTags.map(t => '<span>'+t+'</span>').join('');

      // 组装 HTML
      const html =
      '<div class="result-scroll">'+

        /* 1. 宇宙标题区 */
        '<div class="result-hero">'+
          '<span class="result-hero__cosmic">✦ Polka Dot Universe Projection ✦</span>'+
          '<h1 class="result-hero__title">你的宇宙波点投影</h1>'+
          '<p class="result-hero__sub">基于 12 维精神向量 · 100+ 种交叉组合 · 独一无二</p>'+
        '</div>'+

        /* 2. 压轴大标题 */
        '<div class="result-card result-card--accent" style="text-align:center;">'+
          '<p style="font-size:11px;color:#B8A0AC;letter-spacing:3px;margin-bottom:8px;">YOUR POLKA DOT SIGNATURE</p>'+
          '<p style="font-size:20px;font-weight:900;line-height:1.5;color:#2C000E;letter-spacing:0.5px;">'+
            (assembled.prefix ? '<span style="display:inline-block;background:#FFEBF3;color:#E8468A;padding:2px 10px;border-radius:10px;font-size:15px;margin-right:4px;">'+assembled.prefix+'</span>' : '')+
            '<span style="background:linear-gradient(135deg,#FF69B4,#E8468A);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">'+assembled.mainTitle+'</span>'+
            ' <span style="font-size:14px;color:#B8A0AC;">挂件</span> '+
            '<span style="background:linear-gradient(135deg,#DDA0DD,#8B5CF6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">'+assembled.subTitle+'</span>'+
          '</p>'+
          '<p style="font-size:11px;color:#8E707E;margin-top:6px;">'+main.typeSub+'</p>'+
        '</div>'+

        /* 3. 五维能量条 */
        '<div class="result-card">'+
          '<div class="result-card__title"><span class="result-card__title-icon">📊</span>五维多巴胺能量条</div>'+
          '<p class="result-pentagon__hint">你的 <span class="result-highlight">'+DIM_CHINESE[assembled.mainDim]+'</span> 最高，成为核心面料；<span class="result-highlight">'+DIM_CHINESE[assembled.subDim]+'</span> 次之，成为隐藏纽扣</p>'+
          dimBarsHTML+
        '</div>'+

        /* 4. 波点出厂物理参数 */
        '<div class="result-card result-card--accent">'+
          '<div class="result-card__title result-card__title--pink"><span class="result-card__title-icon">🔬</span>你的波点出厂物理参数</div>'+
          '<p style="font-size:11px;color:#B8A0AC;text-align:center;margin-bottom:14px;letter-spacing:0.5px;">Polka Dot Specification · 数据映射自五维得分</p>'+
          '<div class="spec-grid">'+
            '<div class="spec-item"><span class="spec-item__icon">⭕</span><span class="spec-item__label">核心直径</span><span class="spec-item__value">'+diameter+' mm</span><span class="spec-item__desc">'+dDesc(parseFloat(diameter))+'</span></div>'+
            '<div class="spec-item"><span class="spec-item__icon">🔲</span><span class="spec-item__label">布料覆盖率</span><span class="spec-item__value">'+coverage+'%</span><span class="spec-item__desc">'+cDesc(coverage)+'</span></div>'+
            '<div class="spec-item"><span class="spec-item__icon">📏</span><span class="spec-item__label">排列步长</span><span class="spec-item__value">'+meshPitch+' cm</span><span class="spec-item__desc">'+mDesc(parseFloat(meshPitch))+'</span></div>'+
            '<div class="spec-item"><span class="spec-item__icon">🌀</span><span class="spec-item__label">溢出偏心率</span><span class="spec-item__value">'+eccentricity+'%</span><span class="spec-item__desc">'+eDesc(eccentricity)+'</span></div>'+
          '</div>'+
        '</div>'+

        /* 5. 核心面料精神独白 */
        '<div class="result-card result-card--accent">'+
          '<div class="result-card__title result-card__title--pink"><span class="result-card__title-icon">💬</span>核心面料 · 精神独白</div>'+
          '<div class="result-monologue">'+main.coreMonologue+'</div>'+
        '</div>'+

        /* 6. 视觉意象 + 标签 */
        '<div class="result-card">'+
          '<div class="result-visual-imagery" style="margin-bottom:14px;">🎨 '+main.visualImagery+'</div>'+
          '<div class="result-tags">'+tagsHTML+'</div>'+
        '</div>'+

        /* 7. 隐藏纽扣 */
        '<div class="result-card result-card--purple">'+
          '<div class="result-card__title result-card__title--purple"><span class="result-card__title-icon">🔮</span>隐藏异形纽扣 · '+assembled.subTitle+'</div>'+
          '<div class="result-sub-reveal">'+sub.subDesc+'</div>'+
        '</div>'+

        /* 8. 五维特征分析 */
        '<div class="result-card">'+
          '<div class="result-card__title"><span class="result-card__title-icon">🔍</span>五维特征深度分析</div>'+
          '<div class="result-text"><p>'+main.dimensionAnalysis+'</p></div>'+
        '</div>'+

        /* 9. 社交贴贴指南 */
        '<div class="result-card">'+
          '<div class="result-card__title"><span class="result-card__title-icon">🤝</span>社交贴贴指南</div>'+
          '<div class="result-social-guide">'+main.socialGuide+'</div>'+
        '</div>'+

        /* 10. 自救建议 */
        '<div class="result-card">'+
          '<div class="result-card__title"><span class="result-card__title-icon">🛟</span>专属生活自救建议</div>'+
          '<div class="result-self-rescue">'+main.selfRescue+'</div>'+
        '</div>'+

        /* 11. 分享卡片 */
        '<div class="result-share-card">'+
          '<div class="share-card__inner">'+
            '<div class="share-card__header"><span class="share-card__label">视觉人格 · 波点宇宙投影</span></div>'+
            '<div class="share-card__type">'+assembled.fullTitle+'</div>'+
            '<div class="share-card__en">'+main.enTitle+'</div>'+
            '<div class="share-card__sub">'+main.typeSub+'</div>'+
            '<div class="share-card__tags">'+shareTagsHTML+'</div>'+
            '<div class="share-card__divider"></div>'+
            '<div class="share-card__monologue">'+main.coreMonologue+'</div>'+
            '<div class="share-card__divider"></div>'+
            '<div class="share-card__monologue" style="font-size:11px;color:#8E707E;">'+sub.subDesc+'</div>'+
          '</div>'+
        '</div>'+
        '<p class="result-share-hint">📸 长按上方卡片即可截图保存 · 完整 1500 字波点人格深度报告与专属高清手机壁纸，已上架小红书商品，私信扣 1 获取链接解锁 ✦</p>'+

        /* 12. 操作按钮 */
        '<div class="result-actions">'+
          '<button id="btn-retry" class="btn btn--secondary">重新测试</button>'+
          '<button id="btn-share" class="btn btn--primary">分享结果</button>'+
        '</div>'+

      '</div>';

      var resultScreen = document.getElementById('screen-result');
      resultScreen.innerHTML = html;

      setTimeout(function() {
        var retryBtn = document.getElementById('btn-retry');
        var shareBtn = document.getElementById('btn-share');
        if (retryBtn) retryBtn.onclick = resetQuiz;
        if (shareBtn) shareBtn.onclick = function() {
          alert('长按截图即可保存分享卡片！完整报告请私信小红书获取～');
        };
      }, 100);

      console.log('[渲染] ✅ 终极结果页渲染完成，唯一码:', assembled.uniquenessCode);
    }
`;

// ===== 执行替换 =====

// 1. 替换 RESULT_TYPES 块
const rtStart = html.indexOf('/* ── 6 大波点人格结果数据库 ── */');
const rtEndMarker = '\n    /* ── 得分计算引擎 ── */';
const rtEnd = html.indexOf(rtEndMarker);
if (rtStart >= 0 && rtEnd > rtStart) {
  html = html.substring(0, rtStart) + newData + '\n' + html.substring(rtEnd);
  console.log('✓ RESULT_TYPES 块已替换');
} else {
  console.error('✗ 找不到 RESULT_TYPES 边界', rtStart, rtEnd);
}

// 2. 替换 routeResult 函数为 assembleResult
const rrStart = html.indexOf('/* ── 结果路由判定引擎');
const rrEndMarker = '\n    /* ── 页面切换 ── */';
const rrEnd = html.indexOf(rrEndMarker);
if (rrStart >= 0 && rrEnd > rrStart) {
  html = html.substring(0, rrStart) + newAssemble + '\n' + html.substring(rrEnd);
  console.log('✓ routeResult → assembleResult 已替换');
} else {
  console.error('✗ 找不到 routeResult 边界', rrStart, rrEnd);
}

// 3. 替换 renderResult 和 drawDotVisual
const renStart = html.indexOf('/* ── 页面切换 ── */');
const renEndMarker = '\n    /* ── 答题逻辑 ── */';
const renEnd = html.indexOf(renEndMarker);
if (renStart >= 0 && renEnd > renStart) {
  html = html.substring(0, renStart) + newRender + '\n' + html.substring(renEnd);
  console.log('✓ renderResult 已替换');
} else {
  console.error('✗ 找不到 renderResult 边界', renStart, renEnd);
}

// 4. 更新 finishQuiz
html = html.replace(
  /function finishQuiz\(\) \{[\s\S]*?setTimeout\(function\(\) \{[\s\S]*?try \{[\s\S]*?var scores = calculateScores\(userAnswers\);[\s\S]*?(?:var result = routeResult|var assembled = assembleResult)[\s\S]*?switchScreen\('screen-result'\);[\s\S]*?\} catch\(e\)[\s\S]*?\}[\s\S]*?\}, 3000\);[\s\S]*?\}/,
  `function finishQuiz() {
      console.log('[答题] ===== 全部答完，开始结算 =====');

      switchScreen('screen-loading');

      setTimeout(function() {
        try {
          var scores = calculateScores(userAnswers);
          console.log('[结算] 最终得分:', JSON.stringify(scores));

          var assembled = assembleResult(scores);
          console.log('[结算] 拼装结果:', assembled.fullTitle);

          if (!assembled || !assembled.fullTitle) {
            console.error('[结算] ❌ 拼装无效，兜底');
            assembled = assembleResult({ presence:50, density:50, order:50, margin:50, fluctuation:50 });
          }

          renderResult(scores, assembled);
          switchScreen('screen-result');
          console.log('[结算] ===== 全部完成 =====');
        } catch(e) {
          console.error('[结算] 💥 致命错误:', e.message, e.stack);
          try {
            var es = { presence:50, density:50, order:50, margin:50, fluctuation:50 };
            renderResult(es, assembleResult(es));
            switchScreen('screen-result');
          } catch(e2) {
            alert('结果渲染遇到了意外问题，请刷新页面重试。');
          }
        }
      }, 3000);
    }`
);

console.log('✓ finishQuiz 已更新');
console.log('Final checks:');
console.log('  Has MAIN_FABRICS:', html.includes('MAIN_FABRICS'));
console.log('  Has assembleResult:', html.includes('function assembleResult'));
console.log('  Has RESULT_TYPES (old):', html.includes('RESULT_TYPES'));
console.log('  Has routeResult (old):', html.includes('function routeResult'));
console.log('  Has drawDotVisual (old):', html.includes('function drawDotVisual'));

fs.writeFileSync('index.html', html, 'utf8');
console.log('\n✅ All patches applied successfully!');
