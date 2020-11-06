/**
 * 返回一个在指定值之间的随机整数
 * 
 * 不含最大值，但含最小值
 */
export function getRandomInt (max: number, min: number = 0): number {
  if (min > max) {
    const temp = max
    max = min
    min = temp
  }
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 随机大写字母ascii值
 */
export function getRandomUpperWordInt () {
  return getRandomInt(90 + 1, 65)
}

/**
 * 随机小写字母ascii值
 */
export function getRandomLowerWordInt () {
  return getRandomInt(122 + 1, 97)
}

/**
 * 随机生成字符串[a-zA-Z]
 */
export function getRandomString (length: number = 5) {
  const wordArray = new Array<number>(length)
    // map 会跳过空值
    .fill(1).map(() => (
      getRandomInt(1 + 1)
        ? getRandomUpperWordInt()
        : getRandomLowerWordInt()
    ))
  return String.fromCharCode(...wordArray)
}