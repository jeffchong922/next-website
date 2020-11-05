import {RiArrowRightLine} from 'react-icons/ri'
import CommonLink from '../CommonLink'

export interface NavLinks {
  hrefList: {
    href: string
    text: string
    desc?: string
  }[],
  className?: string
}

const NavLinks: React.VFC<NavLinks> = ({
  hrefList,
  className
}) => {
  return (
    <div className={className || ''}>
      {
        hrefList.map(hrefInfo => (
          <nav key={hrefInfo.href} className='flex items-center pb-4'>
            <RiArrowRightLine className='mr-2'/>
            <div>
              <CommonLink href={hrefInfo.href}>{hrefInfo.text}</CommonLink>
              { hrefInfo.desc && <p className='m-0 p-0 text-xs font-bold text-gray-600'>{hrefInfo.desc}</p>}
            </div>
          </nav>
        ))
      }
    </div>
  )
}

export default NavLinks
