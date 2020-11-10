import React, { useEffect, useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import Image from 'next/image'
import NormalLink from '../shared/NormalLink'

export type CardProps = {
  href: string,
  name: string
  icon?: string
  desc?: string
}

const defaultIcon = '/icon-192x192.png'

const Card: React.FC<CardProps> = ({
  href,
  icon,
  name,
  desc
}) => {
  const [iconPath, setIconPath] = useState(defaultIcon)

  useEffect(() => {
    if (icon && !(/https?\:/ig.test(icon))) {
      setIconPath(icon)
    }
  }, [icon])

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
              <Image className='favorite-logo' src={iconPath} alt={name} width={100} height={100}/>
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

      <style global jsx>{`
        .favorite-logo {
          object-fit: cover;
        }
      `}</style>
    </Box>
  )
}

export default Card
