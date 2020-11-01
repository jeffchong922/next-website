import Head from "next/head"
import { useState } from "react"
import useInterval from "../hooks/useInterval"
import LayoutHeader from "./layout-header"

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

const initialIntervalDelay = 10000

const Layout: React.FC = ({
  children
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
  const [delay, setDelay] = useState<number | null>(initialIntervalDelay)

  useInterval(() => {
    const isDarkMode = isDarkModeHours()
    setIsDarkTheme(isDarkMode)
  }, delay, true)

  return (
    <>
      <Head>
        <title>The Jeff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 头部 */}
      <header
        className={`
          fixed left-0 top-0 h-20 z-10 bg-black text-white px-8
          layout-header
        `}
      >
        <LayoutHeader/>
      </header>
      
      {/* 侧边栏 */}
      <aside
        className={`
          fixed left-0 inset-y-0 pt-20 bg-black text-white px-8
          layout-aside
        `}
      >侧边栏</aside>

      {/* 内容区 */}
      <main
        className={`
          min-h-screen
          layout-main
        `}
      >
        {children}
      </main>
      <style jsx>{`
        .layout-header {
          width: 22rem;
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
          }
          .layout-aside {
            transform: translateX(-100%);
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