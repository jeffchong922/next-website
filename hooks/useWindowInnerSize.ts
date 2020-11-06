import { useEffect, useState } from "react"
import { debounce } from "../helpers/debounce-throttle"

type SizeGroup = {
  innerWidth: number
  innerHeight: number
}

export default function useWindowInnerSize (debounceTime: number = 250) {
  const [sizeGroup, setSizeGroup] = useState<SizeGroup>({
    innerWidth: 0,
    innerHeight: 0
  })

  useEffect(() => {
    function handleSizeChange () {
      const {
        innerWidth,
        innerHeight
      } = window
      setSizeGroup({
        innerWidth,
        innerHeight
      })
    }

    // 初始化
    handleSizeChange()

    const debouncedHandleSizeChange = debounce(handleSizeChange, debounceTime)

    window.addEventListener('resize', debouncedHandleSizeChange)
    return () => window.removeEventListener('resize', debouncedHandleSizeChange)

  }, [])

  return sizeGroup
}