import React from 'react'
import { Box, Flex, Text } from 'theme-ui'
import CoverImg from '../shared/CoverImg'
import NormalLink from '../shared/NormalLink'

export type CardProps = {
  href: string,
  name: string
  icon?: string
  desc?: string
}

const Card: React.FC<CardProps> = ({
  href,
  icon,
  name,
  desc
}) => {
  return (
    <Box sx={{ p: ['4', '6'], height: 'full' }}>
      <NormalLink href={href}>
        <Box sx={{ height: 'full' }}>
          <Flex sx={{ mb: ['4', '6'], alignItems: 'center' }}>

            {/* 收藏ICON */}
            <Box sx={{
              flexShrink: 0,
              mr: ['4', '6'],
              width: ['14', '16', '20'],
              height: ['14', '16', '20'],
              overflow: 'hidden',
            }}>
              <CoverImg src={icon} alt={name}/>
            </Box>

            {/* 收藏名 */}
            <Text variant='flexGridTitle'>{name}</Text>

          </Flex>

          {/* Desc */}
          { desc && (
              <Box>
                <Text variant='flexGridSubTitle'>{desc}</Text>
              </Box>
            )
          }
        </Box>
      </NormalLink>
    </Box>
  )
}

export default Card
