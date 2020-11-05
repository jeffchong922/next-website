export interface ISwapData<T> {
  [index: number]: T
}

/**
 * 带有 http/https 的都认为是外链
 */
export function isOutsideHref (href: string): boolean {
  return /^https?/i.test(href)
}

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

export function swap<T> (data: ISwapData<T>, idx: number, swapIdx: number) {
  // const temp = data[idx]
  // data[idx] = data[swapIdx]
  // data[swapIdx] = temp
  [data[idx], data[swapIdx]] = [data[swapIdx], data[idx]]
}

/**
 * 随机排序
 */
export function fisherYates<T> (array: Array<T>): Array<T> {
  const copyArray = array.slice()

  for (let i = copyArray.length - 1; i > 0; i--) {
    const randomIdx = getRandomInt(i + 1)
    swap(copyArray, i, randomIdx)
  }

  return copyArray
}

/**
 * 判断当前是否处在某个时间段
 */
export function isDarkModeHours (): boolean {
  const currentHours = new Date().getHours()
  let isDarkModeTime = false
  
  if (currentHours >= 21 || currentHours <= 6) {
    isDarkModeTime = true
  }

  return isDarkModeTime
}