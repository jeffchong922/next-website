import React, { AnchorHTMLAttributes } from 'react'
import Link from 'next/link'

const NormalLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  className,
  ...otherProps
}) => {
  return (
    <>
      {
        /https?\:/ig.test(href)
          ? (
              <a href={href} {...otherProps}
                target='_blank' rel='noopener noreferrer'
                className={`link ${className}`}
              />
            )
          : (
              <Link href={href || '/'}>
                <a {...otherProps} className={`link ${className}`}/>
              </Link>
            )
      }
      <style jsx>{`
        .link {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </>
  )
}

export default NormalLink
