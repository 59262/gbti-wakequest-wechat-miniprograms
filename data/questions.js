const questions = [
  {
    id: 1,
    stage: 1,
    title: '周末原本约好的安排突然取消了，你的第一反应是？',
    options: [
      { key: 'A', text: '立刻问问还有没有别的活动，空着太浪费了', scores: { connect: 2, doIt: 1 } },
      { key: 'B', text: '太好了，床和我终于可以重新团聚', scores: { lowEnergy: 2, invisible: 1 } },
      { key: 'C', text: '先看看空出来的时间还能完成什么事', scores: { doIt: 2, realistic: 1 } },
      { key: 'D', text: '感觉自己像一颗突然解绑的气球，去哪全靠风', scores: { float: 2, weird: 1 } }
    ]
  },
  {
    id: 2,
    stage: 1,
    title: '群聊里突然有人 @ 你：“出来说句话。”你会？',
    options: [
      { key: 'A', text: '立刻出现，并顺手接一个梗', scores: { connect: 2, burst: 1 } },
      { key: 'B', text: '明明看到了，但希望大家以为我不在', scores: { invisible: 2, lowEnergy: 1 } },
      { key: 'C', text: '只回答跟我有关的重点内容', scores: { realistic: 2, doIt: 1 } },
      { key: 'D', text: '发一个意义不明的表情包，让问题变得更复杂', scores: { weird: 2, connect: 1 } }
    ]
  },
  {
    id: 3,
    stage: 1,
    title: '今天晚上就是作业或任务截止时间，你现在还没开始。你会？',
    options: [
      { key: 'A', text: '马上列清单，先完成最重要的部分', scores: { doIt: 2, realistic: 1 } },
      { key: 'B', text: '先问问朋友们做到哪了，再决定自己慌不慌', scores: { connect: 2, float: 1 } },
      { key: 'C', text: '打开空白文档，然后盯着它缓慢失去生命力', scores: { lowEnergy: 2, invisible: 1 } },
      { key: 'D', text: '先把文件命名为“最终版_真的最终版_v7”，试图制造已完成的气氛', scores: { weird: 2, float: 1 } }
    ]
  },
  {
    id: 4,
    stage: 1,
    title: '食堂人很多，你又不知道吃什么。你会？',
    options: [
      { key: 'A', text: '直接选择排队最短的窗口，效率第一', scores: { realistic: 2, doIt: 1 } },
      { key: 'B', text: '跟朋友点一样的，省去思考过程', scores: { float: 2, connect: 1 } },
      { key: 'C', text: '突然失去进食欲望，回去随便解决', scores: { lowEnergy: 2, invisible: 1 } },
      { key: 'D', text: '在食堂绕三圈，等待香味把自己随机抽走', scores: { weird: 2, float: 1 } }
    ]
  },
  {
    id: 5,
    stage: 1,
    title: '路上遇到一个不太熟的人，对方热情地向你打招呼。你会？',
    options: [
      { key: 'A', text: '自然聊几句，顺便问问对方最近怎么样', scores: { connect: 2, burst: 1 } },
      { key: 'B', text: '礼貌回应，然后迅速结束本次社交任务', scores: { invisible: 2, realistic: 1 } },
      { key: 'C', text: '对方问什么我答什么，保持安全距离', scores: { realistic: 2, lowEnergy: 1 } },
      { key: 'D', text: '聊完以后反复回忆：我刚才表现得像正常人吗？', scores: { weird: 2, invisible: 1 } }
    ]
  },
  {
    id: 6,
    stage: 1,
    title: '朋友临时发消息：“现在出来玩吗？”你会？',
    options: [
      { key: 'A', text: '立刻换衣服，边走边问去哪', scores: { doIt: 2, burst: 1 } },
      { key: 'B', text: '先确认地点、人数和结束时间，再决定', scores: { realistic: 2, lowEnergy: 1 } },
      { key: 'C', text: '委婉拒绝，继续守护自己的房间', scores: { invisible: 2, lowEnergy: 1 } },
      { key: 'D', text: '先答应下来，十分钟后开始后悔自己为什么会被召唤', scores: { weird: 2, connect: 1 } }
    ]
  },
  {
    id: 7,
    stage: 2,
    title: '朋友半夜突然给你发：“在吗？”你会？',
    options: [
      { key: 'A', text: '立刻回复“在，怎么了？”并准备接收故事', scores: { connect: 2, burst: 1 } },
      { key: 'B', text: '先不回，等对方补充到底是什么事', scores: { invisible: 2, realistic: 1 } },
      { key: 'C', text: '看到消息心里一紧，开始猜测是不是出大事了', scores: { connect: 1, overthink: 2 } },
      { key: 'D', text: '回复：“肉体在线，精神已退出登录。”', scores: { weird: 2, lowEnergy: 1 } }
    ]
  },
  {
    id: 8,
    stage: 2,
    title: '手机只剩 3% 的电，而你还在外面。你会？',
    options: [
      { key: 'A', text: '立即开启省电模式，停止一切不必要操作', scores: { realistic: 2, doIt: 1 } },
      { key: 'B', text: '先给朋友发一句“我手机要死了”，再听天由命', scores: { float: 2, connect: 1 } },
      { key: 'C', text: '表面很淡定，实际上每分钟确认一次电量', scores: { realistic: 1, overthink: 2 } },
      { key: 'D', text: '继续刷视频，尊重电量自由离世的选择', scores: { weird: 2, float: 1 } }
    ]
  },
  {
    id: 9,
    stage: 2,
    title: '你给一个比较在意的人发了消息，对方半小时没回。你会？',
    options: [
      { key: 'A', text: '觉得对方可能在忙，先做自己的事', scores: { realistic: 2, lowEnergy: 1 } },
      { key: 'B', text: '打开聊天框看几次，但坚决不追加消息', scores: { invisible: 2, overthink: 1 } },
      { key: 'C', text: '开始复盘自己发出去的每一个字和标点符号', scores: { overthink: 2, weird: 1 } },
      { key: 'D', text: '默认自己已被对方系统识别为垃圾信息', scores: { weird: 2, invisible: 1 } }
    ]
  },
  {
    id: 10,
    stage: 2,
    title: '老师突然说：“今天随机抽几个人展示作业。”你会？',
    options: [
      { key: 'A', text: '迅速检查自己的内容，准备应对', scores: { doIt: 2, realistic: 1 } },
      { key: 'B', text: '默默降低存在感，希望随机算法忘记我', scores: { invisible: 2, lowEnergy: 1 } },
      { key: 'C', text: '开始观察周围同学的表情，判断大家是不是一样慌', scores: { connect: 1, overthink: 2 } },
      { key: 'D', text: '立刻进入“只要我不抬头，我就没有实体”的状态', scores: { weird: 2, invisible: 1 } }
    ]
  },
  {
    id: 11,
    stage: 2,
    title: '你本来只想刷五分钟短视频，结果一抬头已经过去一小时。你会？',
    options: [
      { key: 'A', text: '马上退出，重新安排剩下的时间', scores: { doIt: 2, realistic: 1 } },
      { key: 'B', text: '后悔几秒，然后决定再刷最后一个', scores: { float: 2, lowEnergy: 1 } },
      { key: 'C', text: '觉得今天已经毁了，干脆摆烂到底', scores: { lowEnergy: 2, float: 1 } },
      { key: 'D', text: '相信这不是浪费时间，而是被大数据绑架进行精神采样', scores: { weird: 2, float: 1 } }
    ]
  },
  {
    id: 12,
    stage: 2,
    title: '你想发一条朋友圈或动态，但编辑完又犹豫了。你会？',
    options: [
      { key: 'A', text: '想发就发，没必要想太多', scores: { connect: 2, burst: 1 } },
      { key: 'B', text: '设置部分人可见，安全发表', scores: { realistic: 2, invisible: 1 } },
      { key: 'C', text: '删掉，当作这条动态从未存在过', scores: { invisible: 2, lowEnergy: 1 } },
      { key: 'D', text: '截图留念，然后让它永远活在草稿箱的平行宇宙里', scores: { weird: 2, invisible: 1 } }
    ]
  },
  {
    id: 13,
    stage: 3,
    title: '假如今天可以暂时逃离现实，你会选择哪种方式？',
    options: [
      { key: 'A', text: '找一个没有人的角落，安静到世界忘了我', scores: { invisible: 2, lowEnergy: 1, err: 1 } },
      { key: 'B', text: '变成一只塑料袋，让风替我决定目的地', scores: { float: 2, weird: 1, bag: 1 } },
      { key: 'C', text: '躺在草地上，和一只水豚一起停止思考', scores: { lowEnergy: 2, zen: 1 } },
      { key: 'D', text: '钻进冰箱，看看有没有被遗忘的同类', scores: { weird: 2, overthink: 1, left: 1 } }
    ]
  },
  {
    id: 14,
    stage: 3,
    title: '系统准备为你的精神状态安排一个永久栖息地，你选择？',
    options: [
      { key: 'A', text: '信号满格但永远打不开网页的角落', scores: { invisible: 2, weird: 1, err: 1 } },
      { key: 'B', text: '黄昏时空无一人的便利店门口', scores: { lowEnergy: 2, overthink: 1, left: 1 } },
      { key: 'C', text: '有阳光、有水、有零食、不需要说话的池塘边', scores: { lowEnergy: 2, realistic: 1, zen: 1 } },
      { key: 'D', text: '风特别大的超市停车场', scores: { float: 2, weird: 1, bag: 1 } }
    ]
  },
  {
    id: 15,
    stage: 3,
    title: '以下哪种声音最接近你最近的精神状态？',
    options: [
      { key: 'A', text: '塑料袋在风里哗啦哗啦地飘', scores: { float: 2, weird: 1, bag: 1 } },
      { key: 'B', text: '页面加载失败后那一声沉默的报错', scores: { invisible: 2, weird: 1, err: 1 } },
      { key: 'C', text: '冰箱门关上后，半杯奶茶最后的叹息', scores: { overthink: 2, lowEnergy: 1, left: 1 } },
      { key: 'D', text: '水豚泡在水里，什么也没说的声音', scores: { lowEnergy: 2, zen: 1 } }
    ]
  },
  {
    id: 16,
    stage: 3,
    title: '请选择最接近你灵魂材质的一项：',
    options: [
      { key: 'A', text: 'Wi-Fi 信号：明明存在，但不保证能连上', scores: { invisible: 2, weird: 1, err: 1 } },
      { key: 'B', text: '塑料袋：轻、自由、没有明确人生规划', scores: { float: 2, weird: 1, bag: 1 } },
      { key: 'C', text: '过夜奶茶：曾经很甜，现在情况复杂', scores: { overthink: 2, lowEnergy: 1, left: 1 } },
      { key: 'D', text: '温水里的水豚：不锋利，也不着急', scores: { lowEnergy: 2, realistic: 1, zen: 1 } }
    ]
  },
  {
    id: 17,
    stage: 3,
    title: '如果明天世界就要结束，你今晚会做什么？',
    options: [
      { key: 'A', text: '认真想想该告别谁，最后还是只发一个表情包', scores: { invisible: 1, weird: 1, err: 1 } },
      { key: 'B', text: '躺好，毕竟毁灭世界这种事不归我负责', scores: { lowEnergy: 2, zen: 1 } },
      { key: 'C', text: '带上零食出门，让最后一阵风把我随机送走', scores: { float: 2, weird: 1, bag: 1 } },
      { key: 'D', text: '打开一个一直舍不得删掉的聊天记录或收藏夹', scores: { overthink: 2, lowEnergy: 1, left: 1 } }
    ]
  },
  {
    id: 18,
    stage: 3,
    title: '检测即将结束。系统发现你已经无法被正常归类，请选择最符合你的最终状态：',
    options: [
      { key: 'A', text: '我不是消失了，我只是暂时连接失败', scores: { invisible: 2, weird: 1, err: 1 } },
      { key: 'B', text: '我没有摆烂，我只是达到了情绪上的静止状态', scores: { lowEnergy: 2, zen: 1 } },
      { key: 'C', text: '我没有方向，但我很擅长顺着风活下去', scores: { float: 2, weird: 1, bag: 1 } },
      { key: 'D', text: '我只是舍不得把已经过期的东西扔掉', scores: { overthink: 2, lowEnergy: 1, left: 1 } }
    ]
  }
]

module.exports = questions
