import Link from "next/link"
import { useEffect, useState } from "react"

export interface MenuLinkProps {
  href: string
  pathname: string
}

function generateRegString (str: string): string {
  return str.split('/').filter(Boolean).pop()
}

const MenuLink: React.FC<MenuLinkProps> = ({
  href,
  pathname,
  children
}) => {
  const [reg, setReg] = useState<RegExp>(new RegExp(generateRegString(href)))
  return (
    <>
      <Link href={href}>
        <a className={`
          flex flex-row items-center py-3
          menu-link ${ reg.test(pathname) ? 'active' : '' }
        `}>
          {children}
        </a>
      </Link>
      
      <style jsx>{`
        .menu-link {
          color: white;
          font-weight: 600;
          font-size: 1.3rem;
          padding: 1.25rem 2rem;
        }
        .menu-link:hover {
          background: rgb(26, 32, 44);
        }
        .menu-link.active {
          color: black;
          background: #F4F4EE;
        }
        @media screen and (max-width: 1024px) {
          .menu-link {
            padding: 0.75rem 1rem;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  )
}

export default MenuLink