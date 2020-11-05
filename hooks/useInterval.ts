import { useEffect, useRef } from "react";

export type Callback = () => void

export default function useInterval (callback: Callback, delay: number | null, immediate: boolean = false) {
  const saveCallback = useRef<null | Callback>(null)
  const immediateStatus = useRef(immediate)

  useEffect(() => {
    saveCallback.current = callback
  })

  useEffect(() => {
    function tick () {
      saveCallback.current && saveCallback.current()
    }
    if (delay !== null) {
      immediateStatus.current && tick()
      immediateStatus.current = false
      const timer = setInterval(tick, delay)
      return () => clearInterval(timer)
    }
  }, [delay])
}