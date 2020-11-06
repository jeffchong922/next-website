import React from 'react'
import { Box } from 'theme-ui'
import BBBox from './BBBox'
import NormalLink from './NormalLink'

export type HighlightLinkProps = {
  href: string
}

const HighlightLink: React.FC<HighlightLinkProps> = ({
  href,
  children
}) => {
  return (
    <BBBox>
      <NormalLink href={href}>
        <Box sx={{ variant: 'buttons.resourceNav', textAlign: 'center', py: '6' }}>
          {children}
        </Box>
      </NormalLink>
    </BBBox>
  )
}

export default HighlightLink
