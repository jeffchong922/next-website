import React from 'react'
import BBBox from './BBBox'
import { Box } from 'theme-ui'

const ResourceTitle: React.FC = ({
  children
}) => {
  return (
    <BBBox>
      <Box sx={{
        px: '4',
        py: '6',
        fontSize: '2xl',
        fontWeight: 'bold',
      }}>
        {children}
      </Box>
    </BBBox>
  )
}

export default ResourceTitle
