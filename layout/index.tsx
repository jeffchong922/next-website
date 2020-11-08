import { Box, Container } from 'theme-ui'
import LayoutFooter from './LayoutFooter'
import LayoutHeader from "./LayoutHeader"

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

        <LayoutFooter/>
      </Container>
    </>
  )
}

export default Layout