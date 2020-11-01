import Link from 'next/link'
import { RiArrowLeftRightFill } from 'react-icons/ri'
import ThemeToggle, { ThemeToggleProps } from './ThemeToggle'

export type LayoutHeaderProps = ThemeToggleProps & {
  isCloseMenu: boolean
  onMenuToggleClick: () => void
}

const LayoutHeader: React.VFC<LayoutHeaderProps> = ({
  isDarkMode,
  onThemeChange,
  isCloseMenu,
  onMenuToggleClick
}) => {
  return (
    <div
      className='flex flex-row justify-between items-center h-full text-2xl'
    >
      <div className='flex flex-row items-center justify-center'>
        <button onClick={onMenuToggleClick} className='mr-1 text-gray-400 menu-toggle'>
          <RiArrowLeftRightFill className='text-xl inline-block mr-px'/>
          <span className='text-base'>{isCloseMenu ? 'Menu' : 'Close'}</span>
        </button>
        <Link href='/'><a className='home-link'>The Jeff</a></Link>
      </div>
      <ThemeToggle isDarkMode={isDarkMode} onThemeChange={onThemeChange} />

      <style jsx>{`
        .home-link:hover {
          transition: all .3s;
          color: rgb(177, 199, 214);
        }
        @media screen and (min-width: 1025px) {
          .menu-toggle {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default LayoutHeader