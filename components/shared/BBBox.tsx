import { Box } from 'theme-ui'

const BBBox: React.FC = ({ children }) => 
  <Box
    sx={{
      bg: 'background',
      borderBottomColor: 'text',
      borderBottomWidth: 'px',
      borderBottomStyle: 'solid'
    }}
  >
    {children}
  </Box>

export default BBBox
