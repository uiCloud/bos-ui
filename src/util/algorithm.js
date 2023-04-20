const generateUUID = () => {
  let d = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + getRandomValues() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : r & 0x7 | 0x8).toString(16)
  })
}

/**
 * 0~1之间的随机数，Math.random()等价表达式
 * @return {number}
 */
const getRandomValues = () => {
  const crypto = window.crypto || window.msCrypto
  const randomBuffer = new Uint32Array(1)
  return crypto.getRandomValues(randomBuffer)[0] / Math.pow(2, 32)
}

/**
 *
 * @param min
 * @param max
 * @return {number}
 */
const getRandomIntInclusive = (min, max) => {
  const randomNumber = this.getRandomValues()
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(randomNumber * (max - min)) + min
}

export {
  generateUUID,
  getRandomValues,
  getRandomIntInclusive
}
