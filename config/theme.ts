import { Theme } from "theme-ui";
import { dracula } from "../data/prism-presets";

const theme: Theme = {
  initialColorModeName: 'light',
  useColorSchemeMediaQuery: true,
  colors: { /* 主体样式 */
    text: '#282C35',
    background: '#fff',
    themeIcon: '#ecc94b',
    primary: '#3861DD',
    muted: '#E2E8F0',
    highlight: '#3366FF',
    modes: {
      deep: {
        text: '#F0F5FA',
        background: '#282C35',
        primary: '#87A8F4',
        muted: '#2D3748',
        highlight: '#ADC8FF',
      }
    }
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  fontSizes: { /* 字体大小 */
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  space: { /* 外内边距、定位 */
    px: "1px",
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem",
    "40": "10rem",
    "48": "12rem",
    "56": "14rem",
    "64": "16rem",

    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.666667%",
    "2/6": "33.333333%",
    "3/6": "50%",
    "4/6": "66.666667%",
    "5/6": "83.333333%",
    "1/12": "8.333333%",
    "2/12": "16.666667%",
    "3/12": "25%",
    "4/12": "33.333333%",
    "5/12": "41.666667%",
    "6/12": "50%",
    "7/12": "58.333333%",
    "8/12": "66.666667%",
    "9/12": "75%",
    "10/12": "83.333333%",
    "11/12": "91.666667%",
    "full": "100%",
    "screenHeight": "100vh",
    "screenWidth": "100vw",

    'auto': 'auto'
  },
  sizes: { /* 宽高 */
    px: "1px",
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.2rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "32": "8rem",
    "40": "10rem",
    "48": "12rem",
    "56": "14rem",
    "64": "16rem",

    full: "100%",
    "3xs": "14rem",
    "2xs": "16rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",

    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.666667%",
    "2/6": "33.333333%",
    "3/6": "50%",
    "4/6": "66.666667%",
    "5/6": "83.333333%",
    "1/12": "8.333333%",
    "2/12": "16.666667%",
    "3/12": "25%",
    "4/12": "33.333333%",
    "5/12": "41.666667%",
    "6/12": "50%",
    "7/12": "58.333333%",
    "8/12": "66.666667%",
    "9/12": "75%",
    "10/12": "83.333333%",
    "11/12": "91.666667%",
    "screenHeight": "100vh",
    "screenWidth": "100vw",

    /* Container Component max-width */
    container: '1920px',
  },
  borderWidths: { /* 边框大小 */
    "0": "0",
    "2": "2px",
    "4": "4px",
    "8": "8px",
    "px": "1px"
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    default: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px"
  },
  breakpoints: [
    '768px', '1024px', '1280px',
  ],
  zIndices: [
    0, 1, 9, 99, 999, 9999
  ],
  layout: {
    container: {
      pt: '20',
    },
    header: {
      bg: 'background',
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 3,
      height: '20',
      '& > *': {
        height: 'full'
      }
    },
  },
  grids: {
    themeToggle: {
      position: 'relative',
      width: '14', height: '6',
      borderRadius: 'full',
      borderColor: 'text', borderWidth: 'px', borderStyle: 'solid',
      cursor: 'pointer',
    }
  },
  buttons: {
    themeToggle: {
      position: 'absolute',
      bg: 'text',
      width: '5', height: '5',
      top: 0, bottom: 0, left: 0, my: 'auto',
      borderRadius: 'full',
      transition: 'all .5s',
    },
    resourceNav: {
      position: 'relative',
      zIndex: 1,
      display: 'block',
      width: 'full', p: 0,
      bg: 'background', color: 'text', fontWeight: 'bold',
      borderRadius: 'none',
      fontSize: 'base',
      outline: 'none', cursor: 'pointer',
      transition: 'color .125s linear 0s',
      "::before": {
        content: 'close-quote',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        bg: 'highlight',
        zIndex: -1,
        transformOrigin: '0px 50%',
        transform: 'scaleX(0)',
        transition: 'transform .125s linear 0s',
      },
      ":hover::before": {
        transform: 'scaleX(1)',
      },
      ":hover": {
        color: 'background',
      },
    }
  },
  links: {
    nav: {
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
      transition: 'color .3s ease-out 0s',
      "&::after": {
        content: 'close-quote',
        position: 'absolute',
        display: 'block',
        top: 0,
        left: 0,
        // zIndex: -1,
        p: '.7rem',
        width: 'full',
        height: 'full',
        border: '1px solid #000',
        borderColor: 'text',
        transformOrigin: '0px 50%',
        transform: 'translate(-.7rem, -.7rem) scaleX(0)',
        transition: 'transform .3s ease-out 0s',
      },
      "&:hover::after": {
        transform: 'translate(-.7rem, -.7rem)'
      },
    }
  },
  cards: {
    flexGridBox: {
      bg: 'background',
      transition: 'all .3s ease-out 0s',
      // 边框样式 -----
      borderColor: 'text', borderWidth: 'px',
      borderBottomStyle: 'solid',
      ":nth-of-type(odd)": {
        borderRightStyle: ['unset', 'solid', 'solid']
      },
      ":nth-of-type(even)": {
        borderRightStyle: ['unset', 'unset', 'solid']
      },
      ":nth-of-type(3n)": {
        borderRightStyle: [null, null, 'unset']
      },
      // --------------
      ":hover": {
        bg: 'muted'
      }
    }
  },
  text: {
    flexGridTitle: {
      color: 'text',
      fontSize: ['xl', '2xl', '3xl'],
      fontWeight: 'bold',
      transition: 'color .3s linear 0s',
    },
    flexGridSubTitle: {
      color: 'text',
      fontSize: ['xs', 'sm', 'md'],
      fontWeight: 'bold',
      textTransform: 'uppercase',
      transition: 'color .3s linear 0s',
    },
    footerIcon: {
      display: 'flex',
      justifyContent: 'center', alignItems: 'center',
      color: 'background', bg: 'text',
      width: '2rem', height: '2rem',
      borderRadius: 'full',
      fontSize: '3rem'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      transition: 'color .3s linear',
      textSizeAdjust: '100%',
    },
    h2: {
      fontFamily: 'heading',
      fontWeight: 'body',
      lineHeight: 'heading',
      m: 0,
      mb: '8',
      fontSize: '3xl',
      mt: '16'
    },
    h3: {
      fontFamily: 'heading',
      fontWeight: 'body',
      lineHeight: 'heading',
      m: 0,
      mb: '8',
      fontSize: '2xl',
      mt: '12'
    },
    h4: {
      fontFamily: 'heading',
      fontWeight: 'body',
      lineHeight: 'heading',
      m: 0,
      mb: '8',
      fontSize: 'xl',
      mt: '10'
    },
    p: {
      color: 'text',
      fontFamily: 'monospace',
      fontWeight: 'body',
      lineHeight: 'body',
      my: '8', wordSpacing: '-.2rem'
    },
    a: {
      color: '#736598'
    },
    pre: {
      ...dracula,
      bg: '#011627',
      p: '1em',
      overflow: 'auto',
      borderRadius: '0.3rem',
      '.token-line': {
        lineHeight: '1.5em',
      },
    },
    table: {
      width: "full",
      borderCollapse: "separate",
      borderSpacing: 0
    },
    th: {
      textAlign: "left",
      borderWidth: 'px',
      borderBottomStyle: "solid"
    },
    td: {
      textAlign: "left",
      borderWidth: 'px',
      borderBottomStyle: "solid"
    },
    img: {
      maxWidth: 'full',
    },
    inlineCode: {
      color: 'text', bg: 'muted',
      p: '1',
      borderRadius: 'default'
    },
    hr: {
      border: 'none',
      height: 'px',
      bg: 'text',
      m: '8',
    },
    ol: {
      pl: '6',
    },
    ul: {
      pl: '6',
    },
    li: {
      my: '4'
    }
  }
}

export default theme