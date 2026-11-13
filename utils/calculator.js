const { normalResultMap, highOverthinkMap, hiddenCandidates } = require('../data/rules')

const scoreKeys = [
  'connect',
  'invisible',
  'doIt',
  'float',
  'realistic',
  'weird',
  'burst',
  'lowEnergy',
  'overthink',
  'bag',
  'err',
  'zen',
  'left'
]

function createEmptyScores() {
  return scoreKeys.reduce((scores, key) => {
    scores[key] = 0
    return scores
  }, {})
}

function addScores(target, scores = {}) {
  Object.keys(scores).forEach((key) => {
    target[key] = (target[key] || 0) + scores[key]
  })
}

function calculateFromAnswers(questions, answers) {
  const scores = createEmptyScores()

  questions.forEach((question, index) => {
    const selectedKey = answers[index]
    const option = question.options.find((item) => item.key === selectedKey)
    if (option) {
      addScores(scores, option.scores)
    }
  })

  return scores
}

function phaseScore(questions, answers, start, end, leftKey, rightKey) {
  const phase = { left: 0, right: 0 }

  questions.forEach((question, index) => {
    const questionNumber = index + 1
    if (questionNumber < start || questionNumber > end) return

    const selectedKey = answers[index]
    const option = question.options.find((item) => item.key === selectedKey)
    if (!option) return

    phase.left += option.scores[leftKey] || 0
    phase.right += option.scores[rightKey] || 0
  })

  return phase
}

function chooseDimension(scores, questions, answers, leftKey, rightKey, leftCode, rightCode) {
  if (scores[leftKey] > scores[rightKey]) return leftCode
  if (scores[rightKey] > scores[leftKey]) return rightCode

  const late = phaseScore(questions, answers, 13, 18, leftKey, rightKey)
  if (late.left > late.right) return leftCode
  if (late.right > late.left) return rightCode

  const middle = phaseScore(questions, answers, 7, 12, leftKey, rightKey)
  if (middle.left > middle.right) return leftCode
  if (middle.right > middle.left) return rightCode

  return rightCode
}

function checkHardHiddenResult(scores) {
  if (scores.bag >= 4 && scores.float > scores.doIt) return 'bag'
  if (scores.err >= 4 && scores.invisible > scores.connect) return 'err'
  if (scores.zen >= 4 && scores.lowEnergy > scores.burst && scores.overthink <= 5) return 'zen'
  if (scores.left >= 4 && scores.overthink >= 6) return 'left'
  return ''
}

function checkLuckyHiddenResult(scores, chance = 0.04) {
  const ranked = Object.keys(hiddenCandidates)
    .map((key) => ({ key, value: scores[key] || 0 }))
    .filter((item) => item.value >= 2 && item.value <= 3)
    .sort((a, b) => b.value - a.value)

  if (!ranked.length) return ''
  return Math.random() < chance ? ranked[0].key : ''
}

function generateCoreType(scores, questions, answers) {
  return [
    chooseDimension(scores, questions, answers, 'connect', 'invisible', 'C', 'I'),
    chooseDimension(scores, questions, answers, 'doIt', 'float', 'D', 'F'),
    chooseDimension(scores, questions, answers, 'realistic', 'weird', 'R', 'W'),
    chooseDimension(scores, questions, answers, 'burst', 'lowEnergy', 'B', 'L')
  ].join('')
}

function generateResult(scores, questions, answers) {
  const hardHidden = checkHardHiddenResult(scores)
  if (hardHidden) return { resultId: hardHidden, coreType: '', isHidden: true, trigger: 'hard-hidden' }

  const luckyHidden = checkLuckyHiddenResult(scores, 0.04)
  if (luckyHidden) return { resultId: luckyHidden, coreType: '', isHidden: true, trigger: 'lucky-hidden' }

  const coreType = generateCoreType(scores, questions, answers)
  const overthinkResult = scores.overthink >= 6 ? highOverthinkMap[coreType] : ''
  const resultId = overthinkResult || normalResultMap[coreType] || 'lag'

  return {
    resultId,
    coreType,
    isHidden: false,
    trigger: overthinkResult ? 'high-overthink' : 'normal'
  }
}

module.exports = {
  createEmptyScores,
  calculateFromAnswers,
  generateResult,
  generateCoreType,
  checkHardHiddenResult
}
