import React, { useEffect, useState } from 'react'
import { Progress } from 'theme-ui'
import useWindowInnerSize from '../hooks/useWindowInnerSize'
import useWindowScrollSize from '../hooks/useWindowScrollSize'

const ArticleProgress = () => {
  const [max, setMax] = useState(0)
  const [value, setValue] = useState(0)
  const { innerHeight } = useWindowInnerSize()
  const { scrollY, bodyOffsetHeight } = useWindowScrollSize(12)

  // 计算最大值
  useEffect(() => {
    const maxVal = bodyOffsetHeight - innerHeight
    setMax(maxVal)
  }, [innerHeight, bodyOffsetHeight])

  // 计算值
  useEffect(() => {
    setValue(scrollY)
  }, [scrollY])

  
  return (
    <Progress max={max} value={value}
      sx={{
        bg: 'background',
        height: '1',
        borderRadius: 'none',
        borderBottom: '1px solid',
        borderBottomColor: 'text'
      }}
    ></Progress>
  )
}

export default ArticleProgress
