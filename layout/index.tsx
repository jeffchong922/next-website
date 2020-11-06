import { Box, Container } from 'theme-ui'
import LayoutHeader from "./LayoutHeader"
import ArticleProgress from './ArticleProgress'

export type LayoutProps = {
  showArticleProgress?: boolean
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showArticleProgress
}) => {
  return (
    <>
      <LayoutHeader showArticleProgress={showArticleProgress}/>
      <Container>
        {/* 适配文本进度条 */}
        <Box
          sx={{
            pt: showArticleProgress ? '1' : '0'
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  )
}

export default Layout