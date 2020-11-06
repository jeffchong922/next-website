import { useEffect, useState } from "react"
import { throttle } from "../helpers/debounce-throttle"

type SizeGroup = {
  pageYOffset: number
  scrollY: number
  bodyOffsetHeight: number
}

export default function useWindowScrollSize (throttleTIme: number = 20) {
  const [sizeGroup, setSizeGroup] = useState<SizeGroup>({
    pageYOffset: 0,
    scrollY: 0,
    bodyOffsetHeight: 0
  })

  useEffect(() => {
    function handleScroll () {
      const {
        pageYOffset,
        scrollY
      } = window
      setSizeGroup({
        pageYOffset,
        scrollY,
        bodyOffsetHeight: window.document.body.offsetHeight
      })
    }

    const throttledHandleScroll = throttle(handleScroll, throttleTIme)
    window.addEventListener('scroll', throttledHandleScroll)
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [])

  return sizeGroup
}