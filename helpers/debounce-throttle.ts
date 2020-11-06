export type Procedure = (...args: any[]) => void

export type Result<F extends Procedure> = (this: ThisParameterType<F>, ...args: Parameters<F>) => void

export type DebounceOptions = {
  isImmediate: boolean,
}

export function debounce<F extends Procedure> (
  fn: F,
  waitMilliseconds: number = 50,
  options: DebounceOptions = { isImmediate: false }
): Result<F> {

  let timer: ReturnType<typeof setTimeout> | undefined

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this

    const doLater = function() {
      timer = undefined
      if (!options.isImmediate) {
        fn.apply(context, args)
      }
    }

    const shouldCallNow = options.isImmediate && timer === undefined
    if (timer !== undefined) {
      clearTimeout(timer)
    }
    timer = setTimeout(doLater, waitMilliseconds)

    if (shouldCallNow) {
      fn.apply(context, args)
    }
  }
}

export function throttle<F extends Procedure> (fn: F, waitMilliseconds: number = 50): Result<F> {
  let shouldWait = false

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this

    if (!shouldWait) {
      fn.apply(context, args)
      shouldWait = true

      setTimeout(() => {
        shouldWait = false
      }, waitMilliseconds)
    }
  }
}