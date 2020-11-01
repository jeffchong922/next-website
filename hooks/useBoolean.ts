import { useState } from "react";

export type UseBooleanReturn = [boolean, () => void, () => void]

export default function useBoolean (initial: boolean = false): UseBooleanReturn {
  const [status, setStatus] = useState<boolean>(initial)

  const setTrue = () => setStatus(true)
  const setFalse = () => setStatus(false)

  return [status, setTrue, setFalse]
}