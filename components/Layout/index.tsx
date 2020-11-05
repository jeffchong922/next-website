import Head from "next/head"
import Image from 'next/image'
import { useState, useEffect } from "react"
import useBoolean from "../../hooks/useBoolean"
import useInterval from "../../hooks/useInterval"
import webStorage from "../../utils/web-storage"
import LayoutHeader from "./LayoutHeader"
import LayoutMenu from "./LayoutMenu"
import { isDarkModeHours } from '../../utils/tools'

interface LayoutProps {
  title: string
  subTitle?: string
  bgImgSrc?: string
}

const initialIntervalDelay = 2000
const themeKey = 'theme-dark'
const defaultBgImgSrc = '/images/default-menu-bg.jpg'

const Layout: React.FC<LayoutProps> = ({
  bgImgSrc,
  title, subTitle,
  children
}) => {
  const [imgSrc, setImgSrc] = useState<string>(defaultBgImgSrc)
  const [isDarkTheme, setDarkTheme, setLightTheme] = useBoolean(false)
  const [isCloseMenu, setCloseMenu, setOpenMenu] = useBoolean(true)
  const [delay, setDelay] = useState<number | null>(initialIntervalDelay)

  // 监听背景图是否改变
  useEffect(() => {
    if (bgImgSrc) {
      setImgSrc(bgImgSrc)
    }
  }, [bgImgSrc])

  // 查看浏览器是否保存了主题
  useEffect(() => {
    const isDarkStr = webStorage.getItem(themeKey)
    if (isDarkStr) {
      setDelay(null)
      isDarkStr === 'true'
        ? setDarkTheme()
        : setLightTheme()
    }
  }, [])

  // 根据时间自动变换主题
  useInterval(() => {
    webStorage.setItem(themeKey, '' + isDarkModeHours())
    isDarkModeHours()
      ? setDarkTheme()
      : setLightTheme()
  }, delay)

  function handleThemeChange (isDarkMode: boolean) {
    setDelay(null)
    webStorage.setItem(themeKey, '' + isDarkMode)
    isDarkMode
      ? setDarkTheme()
      : setLightTheme()
  }

  function handleMenuStatusChange () {
    isCloseMenu
      ? setOpenMenu()
      : setCloseMenu()
  }

  return (
    <>
      <Head>
        <title>The Jeff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 头部 */}
      <header
        className={`
          fixed left-0 top-0 z-20 bg-black text-white
          transition-all duration-150
          px-4 lg:px-8 h-12 lg:h-20
          layout-header
        `}
      >
        <LayoutHeader isCloseMenu={isCloseMenu} isDarkMode={isDarkTheme} onThemeChange={handleThemeChange} onMenuToggleClick={handleMenuStatusChange} />
      </header>
      
      {/* 侧边栏 */}
      <aside
        className={`
          fixed left-0 inset-y-0 z-10 bg-black text-white
          transition-all duration-300
          transform ${isCloseMenu ? '-translate-x-full' : 'translate-x-0'}
          lg:translate-x-0
          pt-12 lg:pt-20
          layout-aside
        `}
      >
        <LayoutMenu/>
      </aside>

      {/* 内容区 */}
      <main
        className={`
          min-h-screen pt-12 lg:pt-0
          layout-main
        `}
      >
        {/* 图片 */}
        <Image
          className='object-cover'
          src={imgSrc}
          alt='content-image'
          width={1920}
          height={950}
        />

        <div className='px-6 lg:px-10'>
          {/* 内容标题 */}
          <div className='py-4 lg:py-6'>
            {
              subTitle && 
              <small className='uppercase font-bold text-gray-600'>{subTitle}</small>
            }
            <h1 className='font-bold text-3xl lg:text-5xl'>{title}</h1>
          </div>

          {children}
        </div>
      </main>


      <style jsx>{`
        .layout-header {
          width: auto;
          right: 0;
        }
        .layout-aside {
          width: 100vw;
        }
        .layout-main {
          margin-left: 0;
        }
        @media screen and (min-width: 1024px) {
          .layout-header {
            width: 22rem;
          }
          .layout-aside {
            width: 22rem;
          }
          .layout-main {
            margin-left: 22rem;
          }
        }
      `}</style>
      
      {/* 主题切换关键地方 */}
      <style global jsx>{`
        html, body {
          background: ${isDarkTheme ? 'rgb(26, 32, 44)' : '#F4F4EE'};
          color: ${isDarkTheme ? 'white' : 'black'};
          transition-property: color, background-color;
          transition-duration: .3s;
        }
      `}</style>
    </>
  )
}

export default Layout