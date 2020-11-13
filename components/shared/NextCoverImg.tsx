import React from 'react'
import Image from 'next/image'

const NextCoverImage: React.VFC<{ src: string, alt: string }> = ({
  src,
  alt
}) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Image className='next-cover-image' src={src} alt={alt} layout='fill'/>
      <style global jsx>{`
        .next-cover-image {
          object-fit: cover;
        }
      `}</style>
    </div>
  )
}

export default NextCoverImage
