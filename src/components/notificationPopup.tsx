"use client"
import { saveMessagingToken } from "@/messaging"
import { env } from "@/env"
import { useEffect, useState } from "react"
import Loading from "@/components/loading"

const RequestPermissions = () => {
  const [hasMessaging, setHasMessaging] = useState(true)
  const [startedEnabling, setStartedEnabling] = useState(false)

  useEffect(() => {
    if (typeof window == "undefined") {
      setHasMessaging(true)
    } else if (
      localStorage.getItem("messagingToken") ||
      sessionStorage.getItem("messagingToken")
    ) {
      setHasMessaging(true)
    } else {
      setHasMessaging(false)
    }
  }, [])

  const enableMessaging = async () => {
    const messagingToken = await saveMessagingToken()
    const userSubcamp = localStorage.getItem("subcamp")
    await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subcamp: userSubcamp, token: messagingToken }),
    })
  }
  const handleMessaging = async () => {
    const token = await saveMessagingToken()
    if (!token) return console.log("Permission declined")
    localStorage.setItem("messagingToken", token)
    enableMessaging()
    console.log(token)
  }
  const inurl = typeof window !== "undefined" ? window.location.pathname : ""

  const handleAction = async (action: string): Promise<void> => {
    setStartedEnabling(true)
    if (typeof window !== "undefined") {
      switch (action) {
        case "accept":
          await handleMessaging()
          location.reload()
          break
        case "decline":
          localStorage.setItem("messagingToken", "Disallowed")
          location.reload()
          break
        case "outside":
          sessionStorage.setItem("messagingToken", "Disallowed")
          location.reload()
          break
        default:
          console.log("Invalid action")
      }
    }
  }
  console.log(inurl)
  if (
    !hasMessaging &&
    !inurl.includes("/privacy-policy") &&
    !inurl.includes("/cookies") &&
    !inurl.includes("/terms")
  ) {
    return (
      <div>
        <div
          className="absolute z-20 h-screen w-screen bg-helsinki opacity-80"
          onClick={() => handleAction("outside")}
        ></div>
        <div
          className="absolute z-30 flex h-min max-h-[30%] w-min min-w-[60%] max-w-[90%] flex-col items-center justify-between rounded-[20px] bg-oslo p-4 shadow-lg shadow-helsinki lg:max-w-[30%] "
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            margin: "auto",
          }}
        >
          <h1 className="rounded-2xl text-center text-2xl text-ateena">
            Haluatko vastaanottaa ilmoituksia?
          </h1>
          <div className="flex w-min justify-between gap-5  p-4">
            <button
              className="rounded-2xl bg-buenos_aires p-4 text-2xl"
              onClick={() => handleAction("decline")}
            >
              En
            </button>
            <button
              className="rounded-2xl bg-soul p-4 text-2xl"
              onClick={() => handleAction("accept")}
            >
              Kyllä
            </button>
          </div>
          <Loading text={"Käsitellään"} load={startedEnabling} />
        </div>
      </div>
    )
  }

  return null
}

export default RequestPermissions
