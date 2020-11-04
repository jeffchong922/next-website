import { Box } from 'theme-ui'

const BBBox: React.FC = ({ children }) => 
  <Box
    sx={{
      transition: 'border .25s linear 0s',
      borderBottomColor: 'text',
      borderBottomWidth: 'px',
      borderBottomStyle: 'solid'
    }}
  >
    {children}
  </Box>

export default BBBox
