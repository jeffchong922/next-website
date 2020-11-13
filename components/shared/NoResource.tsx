import React from 'react'
import BBBox from '../shared/BBBox'

const NoResource: React.VFC = () => {
  return (
    <BBBox>
      <div className='no-resource'>
        暂时没有相关资源😭
      </div>
      <style jsx>{`
        .no-resource {
          height: 50vh;
          font-size: 2rem;
          text-align: center;
          line-height: 50vh;
        }
      `}</style>
    </BBBox>
  )
}

export default NoResource
