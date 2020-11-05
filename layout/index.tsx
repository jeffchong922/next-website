import { Container } from 'theme-ui'
import LayoutHeader from "./LayoutHeader"

const Layout: React.FC = ({
  children
}) => {
  return (
    <>
      <LayoutHeader/>
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout