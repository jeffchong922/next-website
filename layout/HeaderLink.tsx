/** @jsxRuntime classic */
/** @jsx jsx */
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
      <NavLink>
        {children}
      </NavLink>
    </Link>
  )
}

export default HeaderLink
