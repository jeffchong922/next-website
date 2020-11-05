import React from 'react'
import { Box, Text } from 'theme-ui'
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

  return (
    <Box sx={{ p: '10', pb: '16', height: 'full' }}>
      <NormalLink href={`/articles/${id}`}>
        <Box sx={{ height: 'full' }}>
          <Text variant='flexGridSubTitle' sx={{ pb: '6'}}>ss</Text>
          <Text variant='flexGridTitle'>{title}</Text>
        </Box>
      </NormalLink>
    </Box>
  )
}

export default Card
