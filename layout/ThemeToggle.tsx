/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx, Box, useColorMode, Flex } from 'theme-ui'
import { RiSunFill, RiMoonFill } from 'react-icons/ri'

const ThemeToggle: React.VFC = () => {
  const [mode, setMode] = useColorMode()
  function handleThemeChange () {
    const next = mode === 'deep' ? 'light' : 'deep'
    setMode(next)
  }
  return (
    <Box>
      {/* 主题切换按钮 */}
      <Flex onClick={handleThemeChange}
        css={{
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
        sx={{ variant: 'grids.themeToggle' }}
      >
        {/* 图标 */}
        <RiMoonFill sx={{ fontSize: 'lg', color: 'themeIcon' }}/>
        <RiSunFill sx={{ fontSize: 'lg', color: 'themeIcon' }}/>

        {/* 小圆圈 */}
        <Box
          sx={{
            variant: 'buttons.themeToggle',
            transform: `${mode === 'deep' ? 'translateX(1.7rem)' : 'translateX(.1rem)'}`
          }}
        />
      </Flex>
    </Box>
  )
}

export default ThemeToggle
