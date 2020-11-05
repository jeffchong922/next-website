import React from 'react'
import { Box, Flex } from 'theme-ui'

export type Resource = {
  id: string
  [props: string]: any
}

export type FlexGridProps = {
  RenderItem: (props) => React.ReactElement
  resources: Resource[]
}

const FlexGrid: React.FC<FlexGridProps> = ({
  RenderItem,
  resources
}) => {
  return (
    <Flex sx={{ flexWrap: 'wrap', bg: 'muted' }}>
      {
        resources.map(resource => (
          <Box key={resource.id} sx={{ width: ['full', '1/2', '1/3'], variant: 'cards.flexGridBox' }}>
            <RenderItem {...resource}/>
          </Box>
        ))
      }
    </Flex>
  )
}

export default FlexGrid
