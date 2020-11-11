import { Flex, Box, Text } from 'theme-ui'
import BBBox from '../components/shared/BBBox'
import Pages from '../config/pages'
import ArticleProgress from './ArticleProgress'
import HeaderLink from './HeaderLink'
import ThemeToggle from './ThemeToggle'

export type LayoutHeaderProps = {
  showArticleProgress?: boolean
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  showArticleProgress
}) => {
  return (
    <Box sx={{ variant: 'layout.header' }}>
      <BBBox>
        <Flex sx={{ height: 'full' }}>

          {/* 占位用 */}
          <Box sx={{ flex: '1 1 auto' }}></Box>

          {/* 菜单 */}
          <Flex css={{ alignItems: 'center'}}>
            {/* pages链接 */}
            <Flex sx={{ mr: ['2', '4'] }}>
              {
                Pages.map(page => (
                  <Box key={page.path} sx={{ mr: ['4', '8'] }}>
                    <HeaderLink href={page.path}>
                      <Text>{page.name}</Text>
                    </HeaderLink>
                  </Box>
                ))
              }
            </Flex>

            {/* 转换主题 */}
            <Box sx={{ mr: ['.4rem', '.9rem'] }}>
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

      {/* 文本进度条 */}
      { showArticleProgress && <ArticleProgress/>}

    </Box>
  )
}

export default LayoutHeader
