const normalResultMap = {
  CDRB: 'amer',
  CDRL: 'chop',
  CDWB: 'rply',
  CDWL: 'coo',
  CFRB: 'zoom',
  CFRL: 'cold',
  CFWB: 'flyr',
  CFWL: 'capy',
  IDRB: 'pen',
  IDRL: 'cact',
  IDWB: 'buff',
  IDWL: 'cup',
  IFRB: 'powr',
  IFRL: 'pair',
  IFWB: 'wish',
  IFWL: 'lag'
}

const highOverthinkMap = {
  CDRL: 'boba',
  CDWL: 'nood',
  CFRL: 'cake',
  CFWB: 'rcll',
  IDRB: 'dot',
  IDWL: 'sock',
  IFRB: 'slip',
  IFWL: 'mush'
}

const hiddenCandidates = {
  bag: 'bag',
  err: 'err',
  zen: 'zen',
  left: 'left'
}

module.exports = {
  normalResultMap,
  highOverthinkMap,
  hiddenCandidates
}
