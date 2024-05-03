"use client"
import { saveMessagingToken } from "@/messaging"
import { env } from "@/env"

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

const handleAction = async (action: string): Promise<void> => {
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

const RequestPermissions = () => {
  if (typeof window == "undefined") {
    return null
  } else if (
    localStorage.getItem("messagingToken") ||
    sessionStorage.getItem("messagingToken")
  ) {
    return null
  }

  return (
    <div>
      <div
        className="absolute z-20 h-screen w-screen bg-helsinki opacity-80"
        onClick={() => handleAction("outside")}
      ></div>
      <div
        className="absolute z-30 flex max-h-[30%] max-w-[90%] flex-col items-center justify-between rounded-[20px] bg-oslo p-2 shadow-lg shadow-helsinki lg:max-w-[30%] "
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          margin: "auto",
        }}
      >
        <p className="rounded-2xl align-middle text-2xl text-ateena">
          Haluatko vastaanottaa ilmoituksia?
        </p>
        <div className="hadow-helsinki flex w-full justify-between  p-4 shadow-lg">
          <button
            className="rounded-2xl bg-buenos_aires p-4 text-2xl"
            onClick={() => handleAction("accept")}
          >
            Hyväksy
          </button>
          <button
            className="rounded-2xl bg-soul  p-4 text-2xl"
            onClick={() => handleAction("decline")}
          >
            Kiellä{" "}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RequestPermissions
