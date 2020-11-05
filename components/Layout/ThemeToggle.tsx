import { RiSunFill, RiMoonFill } from 'react-icons/ri'

export interface ThemeToggleProps {
  isDarkMode: boolean
  onThemeChange: (isDarkMode: boolean) => void
}

const ThemeToggle: React.VFC<ThemeToggleProps> = ({
  isDarkMode,
  onThemeChange
}) => {
  return (
    <div>
      <div
        onClick={() => { onThemeChange(!isDarkMode) }}
        className={`
          relative
          flex flex-row justify-around items-center
          bg-gray-700 w-12 h-6 rounded-2xl cursor-pointer
        `}
      >
        <RiMoonFill className='text-1xl text-yellow-500'/>
        <RiSunFill className='text-1xl text-yellow-500'/>
        <div
          className={`
            absolute inset-y-0 my-auto left-0
            transition-transform duration-300 transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}
            h-6 w-6 border-2 border-indigo-700 rounded-full
            bg-gray-100
          `}
        ></div>
      </div>
    </div>
  )
}

export default ThemeToggle