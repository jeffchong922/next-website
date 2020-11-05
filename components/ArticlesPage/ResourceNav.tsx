import React from 'react'
import { Button, Flex } from 'theme-ui'
import BBBox from '../shared/BBBox'

export type ResourceNavProps = {
  leftClick?: () => void
  rightClick?: () => void
}

const ResourceNav: React.VFC<ResourceNavProps> = ({
  leftClick,
  rightClick
}) => {
  function handleLeftClick () {
    leftClick && leftClick()
  }

  function handleRightClick () {
    rightClick && rightClick()
  }
  return (
    <BBBox>
      <Flex>
        <Button variant='resourceNav' sx={{
          textAlign: 'left', p: '6',
          borderColor: 'text',
          borderWidth: 'px',
          borderRightStyle: 'solid'
        }} onClick={handleLeftClick}>
          上一页
        </Button>
        <Button variant='resourceNav' sx={{ textAlign: 'right', p: '6' }}
          onClick={handleRightClick}
        >
          下一页
        </Button>
      </Flex>
    </BBBox>
  )
}

export default ResourceNav
