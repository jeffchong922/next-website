import Link from 'next/link'
import { isOutsideHref } from '../utils/tools'

export interface CommonLinkProps {
  href: string
}

const CommonLink: React.FC<CommonLinkProps> = ({
  href,
  children
}) => {
  return (
    <>
      {
        isOutsideHref(href)
          ? (
              <a href={href} className='common-link' target='_blank' rel='noopener noreferrer'>
                {children}
              </a>
            )
          : (
              <Link href={href}>
                <a className='common-link'>
                  {children}
                </a>
              </Link>
            )
      }
      <style jsx>{`
        .common-link {
          color: #4255ff;
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

export default CommonLink
