import { Flex, Box, Text } from 'theme-ui'
import BBBox from '../components/shared/BBBox'
import HeaderLink from './HeaderLink'
import ThemeToggle from './ThemeToggle'

const LayoutHeader: React.FC = () => {
  return (
    <BBBox>
      <Flex>

        {/* 占位用 */}
        <Box sx={{ flex: '1 1 auto' }}></Box>

        {/* 菜单 */}
        <Flex css={{ alignItems: 'center'}}>
          {/* 转换主题 */}
          <Box sx={{ mr: '.9rem' }}>
            <ThemeToggle/>
          </Box>

          {/* 主页链接 */}
          <Flex sx={{ p: '.9rem', alignItems: 'center'}}>
            <HeaderLink href='/'>
              <Text sx={{ fontSize: '4xl' }}>Jeff</Text>
            </HeaderLink>
          </Flex>
        </Flex>
      </Flex>
    </BBBox>
  )
}

export default LayoutHeader
