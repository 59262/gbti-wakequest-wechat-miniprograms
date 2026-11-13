const questions = require('../../data/questions')
const { calculateFromAnswers, generateResult } = require('../../utils/calculator')

const stageMap = {
  1: {
    title: '了解日常模式',
    hint: '从日常选择开始认识你。'
  },
  2: {
    title: '读取网络状态',
    hint: '你的在线精神状态正在显现。'
  },
  3: {
    title: '匹配精神物种',
    hint: '快要发现你的精神物种了。'
  }
}

Page({
  data: {
    questions,
    currentIndex: 0,
    answers: [],
    currentQuestion: questions[0],
    stageInfo: stageMap[1],
    progressPercent: 6,
    questionNo: '01',
    isLast: false
  },

  onLoad() {
    this.initPageFlipAudio()
    this.syncQuestionState()
  },

  initPageFlipAudio() {
    if (this.pageFlipAudio) return

    const audio = wx.createInnerAudioContext()
    audio.src = '/assets/audio/page-flip.mp3'
    audio.volume = 1
    audio.obeyMuteSwitch = false
    this.pageFlipAudio = audio
  },

  playPageFlip() {
    if (!this.pageFlipAudio) {
      this.initPageFlipAudio()
    }

    try {
      this.pageFlipAudio.stop()
      this.pageFlipAudio.seek(0)
      this.pageFlipAudio.play()
    } catch (error) {
      // Keep navigation responsive even if the device refuses short audio playback.
    }
  },

  syncQuestionState() {
    const currentQuestion = questions[this.data.currentIndex]
    this.setData({
      currentQuestion,
      stageInfo: stageMap[currentQuestion.stage],
      progressPercent: Math.round(((this.data.currentIndex + 1) / questions.length) * 100),
      questionNo: String(this.data.currentIndex + 1).padStart(2, '0'),
      isLast: this.data.currentIndex === questions.length - 1
    })
  },

  selectOption(event) {
    const answers = this.data.answers.slice()
    answers[this.data.currentIndex] = event.detail.key
    this.setData({ answers })
  },

  prevQuestion() {
    if (this.data.currentIndex === 0) return
    this.setData({ currentIndex: this.data.currentIndex - 1 }, () => this.syncQuestionState())
  },

  nextQuestion() {
    if (!this.data.answers[this.data.currentIndex]) {
      wx.showToast({
        title: '先留下你的异常反应',
        icon: 'none'
      })
      return
    }

    if (!this.data.isLast) {
      this.playPageFlip()
      this.setData({ currentIndex: this.data.currentIndex + 1 }, () => this.syncQuestionState())
      return
    }

    this.playPageFlip()
    const scores = calculateFromAnswers(questions, this.data.answers)
    const result = generateResult(scores, questions, this.data.answers)

    wx.redirectTo({
      url: `/pages/loading/loading?resultId=${result.resultId}&hidden=${result.isHidden ? 1 : 0}&trigger=${result.trigger}&coreType=${result.coreType}`
    })
  },

  onUnload() {
    if (this.pageFlipAudio) {
      this.pageFlipAudio.destroy()
      this.pageFlipAudio = null
    }
    this.setData({ answers: [] })
  }
})
