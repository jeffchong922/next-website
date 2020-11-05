export type PageInfo = {
  path: string
  name: string
}

const Pages: PageInfo[] = [
  {
    path: '/articles',
    name: '博客内容'
  },
  {
    path: '/favorite',
    name: '收藏夹'
  }
]

export default Pages