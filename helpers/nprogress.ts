// https://github.com/rstacruz/nprogress
import Router from 'next/router'
import nProgress, { NProgressOptions } from 'nprogress'

// 自定义默认配置
nProgress.configure({
  showSpinner: false
})

/**
 * 全局 _app 执行即可
 * 
 * 确保引入相应 css 文件
 */
export default function useNProgress () {
  // Fires when a route starts to change
  Router.events.on('routeChangeStart', (url) => {
    nProgress.start()
  })

  // Fires when a route changed completely
  Router.events.on('routeChangeComplete', (url) => {
    nProgress.done()
  })

  // Fires when there's an error when changing routes, or a route load is cancelled
  Router.events.on('routeChangeError', (err, url) => {
    nProgress.done()
  })  
}

/**
 * 配置 nprogress
 */
export function setNProgress (config: Partial<NProgressOptions>) {
  nProgress.configure(config)
}

export const nPInstance = nProgress