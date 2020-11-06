export function flatten<T = any> (array: Array<T | T[]>): T[] {
  return array.reduce<T[]>(
    (list, v) => (
      list.concat(
        Array.isArray(v)
          ? flatten(v)
          : v
      )
    ),
    []
  )
}