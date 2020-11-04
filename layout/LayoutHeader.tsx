import { Flex, Box } from 'theme-ui'
import BBBox from '../components/shared/BBBox'
import ThemeToggle from './ThemeToggle'

const LayoutHeader: React.FC = () => {
  return (
    <BBBox>
      <Flex p={3}>

        {/* 占位用 */}
        <Box sx={{ flex: '1 1 auto' }}></Box>

        {/* 菜单 */}
        <Box>
          <ThemeToggle/>
        </Box>
      </Flex>
    </BBBox>
  )
}

export default LayoutHeader
