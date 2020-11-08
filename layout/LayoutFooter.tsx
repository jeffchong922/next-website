import React from 'react'
import { Box, Flex, Text } from 'theme-ui'
import { RiGithubLine, RiMailSendLine } from 'react-icons/ri'
import NormalLink from '../components/shared/NormalLink'

const LayoutFooter: React.VFC = () => {
  return (
    <Flex sx={{
      p: '10',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    }}>
      <Box sx={{
        width: ['full', 'auto'],
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 'xs',
        mb: '4'
      }}>
        COPYRIGHT <small>&copy;</small> 2020
      </Box>

      <Flex sx={{
        width: ['full', 'auto'],
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        <NormalLink href='mailto:jeffchong922@outlook.com'>
          <Text variant='footerIcon'><RiMailSendLine/></Text>
        </NormalLink>
        <NormalLink href='https://github.com/jeffchong922'>
          <Text variant='footerIcon'><RiGithubLine/></Text>
        </NormalLink>
      </Flex>
    </Flex>
  )
}

export default LayoutFooter
