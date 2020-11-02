import Link from "next/link"
import { useState } from "react"

export interface MenuLinkProps {
  href: string
  pathname?: string
  isOutside?: boolean
}

function generateRegString (str: string): string {
  return str.split('/').filter(Boolean).pop()
}

function isOutsideLink (href: string): boolean {
  return /^https?/i.test(href)
}

const MenuLink: React.FC<MenuLinkProps> = ({
  href,
  pathname = '',
  children
}) => {
  const [reg, setReg] = useState<RegExp>(new RegExp(generateRegString(href)))
  return (
    <>
      {
        isOutsideLink(href)
          ? (
              <a href={href} className='menu-link'>
                {children}
              </a>
            )
          : (
              <Link href={href}>
                <a className={`menu-link ${ reg.test(pathname) ? 'active' : '' } `}>
                  {children}
                </a>
              </Link>
            )
      }
      
      <style jsx>{`
        .menu-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          font-size: 1.2rem;
          color: white;
          font-weight: 600;
        }
        .menu-link:hover {
          background: rgb(26, 32, 44);
        }
        .menu-link.active {
          color: black;
          background: #F4F4EE;
        }
        @media screen and (min-width: 1024px) {
          .menu-link {
            padding: 1.25rem 2rem;
            font-size: 1.3rem;
          }
        }
      `}</style>
    </>
  )
}

export default MenuLink