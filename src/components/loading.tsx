"use client"

import { useEffect, useState } from "react"

const Loading = (props: { text: string; load: boolean }) => {
  const [dots, setDots] = useState(".")

  useEffect(() => {
    if (props.load) {
      const timer = setTimeout(() => {
        if (dots === "......") {
          setDots(".")
        } else {
          setDots(`${dots}.`)
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [dots, props.load])

  if (props.load) {
    return <div>{props.text + dots}</div>
  }

  return <></>
}

export default Loading
