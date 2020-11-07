import React, { useEffect, useState } from 'react'
import { Box, Text } from 'theme-ui'
import { getRandomInt } from '../../helpers/random'
import NormalLink from './NormalLink'

export type ArticleCardProps = {
  id: string
  tags: string[]
  title: string
  desc?: string
  showDesc?: boolean
}

const ArticleCard: React.VFC<ArticleCardProps> = ({
  id,
  tags,
  title,
  desc,
  showDesc = false
}) => {
  const [randomTag, setRandomTag] = useState('')

  useEffect(() => {
    const tagsLength = tags.length
    if (tagsLength > 0) {
      const randomIdx = getRandomInt(tagsLength)
      setRandomTag(tags[randomIdx])
    }
  }, [tags])

  return (
    <Box sx={{ p: '10', pb: '16', height: 'full' }}>
      <NormalLink href={`/articles/${id}`}>
        <Box sx={{ height: 'full' }}>
          <Text variant='flexGridSubTitle' sx={{ pb: '6'}}>{randomTag}</Text>
          <Text variant='flexGridTitle'>{title}</Text> 
          { showDesc && <Text sx={{ pt: '6'}}>{ desc || '该文章没有添加描述'}</Text> }
        </Box>
      </NormalLink>
    </Box>
  )
}

export default ArticleCard
