export function transformStrForLink (str: string): string {
  return str.toLocaleLowerCase().split(' ').join('-').trim()
}

export function transformStrForShow (str: string): string {
  return str.toUpperCase().split('-').join(' ').trim()
}