export function transformTagForLink (tag: string): string {
  return tag.toLocaleLowerCase().split(' ').join('-').trim()
}

export function transformTagForShow (tag: string): string {
  return tag.toUpperCase().split('-').join(' ').trim()
}