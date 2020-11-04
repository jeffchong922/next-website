import React from 'react'
import Link from 'next/link'
import { jsx, NavLink } from 'theme-ui'

export type HeaderLinkProps = {
  href: string
}

const HeaderLink: React.FC<HeaderLinkProps> = ({
  href,
  children
}) => {
  return (
    <Link href={href}>
      <a style={{ color: 'inherit' }}>
        <NavLink as='div'>
          {children}
        </NavLink>
      </a>
    </Link>
  )
}

export default HeaderLink
