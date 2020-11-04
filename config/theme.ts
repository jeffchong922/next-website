import { Theme } from "theme-ui";

const theme: Theme = {
  useColorSchemeMediaQuery: true,
  colors: { /* 主体样式 */
    text: '#2d3748',
    background: '#fff'
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
  },
  borderWidths: { /* 边框大小 */
    "0": "0",
    "2": "2px",
    "4": "4px",
    "8": "8px",
    "px": "1px"
  },
}

export default theme