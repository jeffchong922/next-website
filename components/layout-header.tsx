import Link from 'next/link'
import ThemeToggle, { ThemeToggleProps } from './ThemeToggle'

export interface LayoutHeaderProps extends ThemeToggleProps {

}

const LayoutHeader: React.VFC<LayoutHeaderProps> = ({
  isDarkMode,
  onThemeChange
}) => {
  return (
    <div>
      <Link href='/'><a>The Jeff</a></Link>
      <ThemeToggle isDarkMode={isDarkMode} onThemeChange={onThemeChange} />
    </div>
  )
}

export default LayoutHeader