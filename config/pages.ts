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
    path: '/projects',
    name: '个人作品',
  },
  {
    path: '/favorite',
    name: '收藏夹'
  },
]

export default Pages