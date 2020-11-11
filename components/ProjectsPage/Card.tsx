import React from 'react'
import { Box, Flex, Text } from 'theme-ui'
import NormalLink from '../shared/NormalLink'
import CoverImg from '../shared/CoverImg'

export type CardProps = {
  href: string,
  title: string
  screenShort: string
  skill: string
  desc?: string
}

const defaultScreenShort = '/images/defaultScreenShort.png'

const Card: React.FC<CardProps> = ({
  href,
  title,
  screenShort,
  skill,
  desc
}) => {
  const iconPath = screenShort || defaultScreenShort

  return (
    <Box sx={{ p: '8', height: 'full' }}>
      <NormalLink href={href}>
        <Box sx={{ height: 'full' }}>
          <Flex sx={{ flexDirection: 'column' }}>

            {/* ScreenShort */}
            <Box sx={{
              overflow: 'hidden',
              width: 'full',
              height: ['3xs', '2xs', 'xs'],
              mb: ['4', '6'],
            }}>
              <CoverImg src={iconPath} alt={title}/>
            </Box>

            {/* Title & Skill */}
            <Flex sx={{ justifyContent: 'space-between' }}>
               <Text variant='flexGridTitle'>{title}</Text>
               <Text variant='flexGridSubTitle'>{skill}</Text>
            </Flex>

          {/* Desc */}
          { desc && (
              <Box sx={{ mt: ['4', '6'], }}>
                <Text >{desc}</Text>
              </Box>
            )
          }
          </Flex>
        </Box>
      </NormalLink>
    </Box>
  )
}

export default Card