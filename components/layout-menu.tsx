import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiArticleLine } from 'react-icons/ri'
import MenuLink from './menu-link'

const LayoutMenu: React.VFC = () => {
  const { pathname } = useRouter()
  return (
    <div>
      <MenuLink href='/articles/' pathname={pathname}>
        <RiArticleLine className='mr-2'/>
        <span>文章</span>
      </MenuLink>
    
    </div>
  )
}

export default LayoutMenu