import React from 'react'
import { Box, Flex } from 'theme-ui'

export type FlexGridProps = {
  RenderItem: (props) => React.ReactElement
  resources: {
    id: string
    [props: string]: any
  }[]
}

const FlexGrid: React.FC<FlexGridProps> = ({
  RenderItem,
  resources
}) => {
  return (
    <Flex sx={{ flexWrap: 'wrap' }}>
      {
        resources.map(resource => (
          <Box key={resource.id} sx={{ width: ['full', '1/2', '1/3'] }}>
            <RenderItem {...resource}/>
          </Box>
        ))
      }
    </Flex>
  )
}

export default FlexGrid
