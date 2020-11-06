import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'theme-ui'
import theme from '../config/theme'
import useNProgress from '../helpers/nprogress'

useNProgress()

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Jeff - 前端萌新🧐</title>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps}/>
      </ThemeProvider>
    </>
  )
}

export default MyApp
