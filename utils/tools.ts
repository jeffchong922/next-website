
/**
 * 带有 http/https 的都认为是外链
 */
export function isOutsideHref (href: string): boolean {
  return /^https?/i.test(href)
}