export type PageInfo = {
  path: string
  name: string
}

const Pages: PageInfo[] = [
  {
    path: '/articles',
    name: '记录'
  },
  {
    path: '/favorite',
    name: '收藏夹'
  }
]

export default Pages