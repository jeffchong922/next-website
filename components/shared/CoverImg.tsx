import React, { ImgHTMLAttributes } from 'react'

function getTheCorrectPath (src: string): string {
  return /^https?/.test(src)
    ? src
    : process.env.NEXT_PUBLIC_IMG_BASE + src
}

const CoverImg: React.VFC<ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  ...otherProps
}) => {
  const path = getTheCorrectPath(src)
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <img className='cover-CoverImg' src={path} {...otherProps}/>
      <style jsx>{`
        .cover-CoverImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  )
}

export default CoverImg
