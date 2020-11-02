import Head from "next/head"
import Image from 'next/image'
import { useState, useEffect } from "react"
import useBoolean from "../hooks/useBoolean"
import useInterval from "../hooks/useInterval"
import webStorage from "../utils/web-storage"
import LayoutHeader from "./layout-header"
import LayoutMenu from "./layout-menu"

interface LayoutProps {
  title: string
  subTitle?: string
  bgImgSrc?: string
}

/**
 * 判断当前是否处在某个时间段
 */
function isDarkModeHours (): boolean {
  const currentHours = new Date().getHours()
  let isDarkModeTime = false
  
  if (currentHours >= 21 || currentHours <= 6) {
    isDarkModeTime = true
  }

  return isDarkModeTime
}

const initialIntervalDelay = 2000
const themeKey = 'theme-dark'
const defaultBgImgSrc = '/images/default-menu-bg.jpg'

const Layout: React.FC<LayoutProps> = ({
  bgImgSrc = defaultBgImgSrc,
  title, subTitle,
  children
}) => {
  const [isImgError, setImgError] = useState(false)
  const [isDarkTheme, setDarkTheme, setLightTheme] = useBoolean(false)
  const [isCloseMenu, setCloseMenu, setOpenMenu] = useBoolean(true)
  const [delay, setDelay] = useState<number | null>(initialIntervalDelay)

  useEffect(() => {
    const isDarkStr = webStorage.getItem(themeKey)
    if (isDarkStr) {
      setDelay(null)
      isDarkStr === 'true'
        ? setDarkTheme()
        : setLightTheme()
    }
  }, [])

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

  function handleImageError () {
    setImgError(true)
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
          fixed left-0 top-0 h-20 z-20 bg-black text-white
          layout-header
        `}
      >
        <LayoutHeader isCloseMenu={isCloseMenu} isDarkMode={isDarkTheme} onThemeChange={handleThemeChange} onMenuToggleClick={handleMenuStatusChange} />
      </header>
      
      {/* 侧边栏 */}
      <aside
        className={`
          fixed left-0 inset-y-0 pt-20 bg-black text-white z-10
          layout-aside
        `}
      >
        <LayoutMenu/>
      </aside>

      {/* 内容区 */}
      <main
        className={`
          min-h-screen
          layout-main
        `}
      >
        {
          // 地址错误将移除背景图
          isImgError || <Image
            className='object-cover'
            src={bgImgSrc}
            alt='content-image'
            onError={handleImageError}
            width={1920}
            height={950}
          />
        }
        <div className='px-6 lg:px-10'>
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
          width: 22rem;
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .layout-aside {
          width: 22rem;
          transition: all .3s;
        }
        .layout-main {
          margin-left: 22rem;
        }
        @media screen and (max-width: 1024px) {
          .layout-header {
            width: auto;
            height: 3rem;
            right: 0;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .layout-aside {
            padding-top: 3rem;
            width: 100vw;
            transform: ${isCloseMenu ? 'translateX(-100%)' : 'translateX(0)'};
          }
          .layout-main {
            margin-left: 0;
            padding-top: 3rem;
          }
        }
      `}</style>
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