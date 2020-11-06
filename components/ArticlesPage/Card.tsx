import React, { useEffect, useState } from 'react'
import { Box, Text } from 'theme-ui'
import { getRandomInt } from '../../helpers/random'
import NormalLink from '../shared/NormalLink'

export type CardProps = {
  id: string
  tags: string[]
  title: string
}

const Card: React.FC<CardProps> = ({
  id,
  tags,
  title
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
        </Box>
      </NormalLink>
    </Box>
  )
}

export default Card
