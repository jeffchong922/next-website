import { useRouter } from 'next/router'
import { RiArticleLine, RiLogoutBoxRLine } from 'react-icons/ri'
import MenuLink from './MenuLink'

const LayoutMenu: React.VFC = () => {
  const { pathname } = useRouter()
  return (
    <div>
      {/* 需要动态图标的情况下还是手动添加菜单吧，避免导入整个图标库 */}
      <MenuLink href='/articles/' pathname={pathname}>
        {/* 添加 css-in-js 样式无反应 */}
        <RiArticleLine className='mr-2'/>
        <span>文章</span>
      </MenuLink>
      <MenuLink href='https://github.com/jeffchong922/next-website'>
        {/* 添加 css-in-js 样式无反应 */}
        <RiLogoutBoxRLine className='mr-2'/>
        <span>本站仓库</span>
      </MenuLink>
    </div>
  )
}

export default LayoutMenu