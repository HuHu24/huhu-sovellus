"use client"
import { signInAnonymously } from "@/firebase"
import { useRouter } from "next/navigation"
import { env } from "@/env"
import { saveMessagingToken } from "@/messaging"

export default function Home() {
  const router = useRouter()

  async function selectSubcamp(subcamp: number) {
    try {
      const [messagingToken] = await Promise.all([
        saveMessagingToken(),
        signInAnonymously(),
      ])

      await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/claims/subcamp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subcamp: subcamp, token: messagingToken }),
      })

      router.push("/")
    } catch (e) {
      console.error("Selecting subcamp failed:", e)
    }
  }

  return (
    <div className="absolute z-30 flex h-screen w-full place-content-center place-items-center overflow-hidden break-all bg-helsinki text-center font-poppins text-ateena">
      <div className="mx-4 my-auto flex w-full max-w-[500px] flex-col items-center justify-between gap-[5px] rounded-[20px] bg-oslo py-2.5">
        <div className="flex h-full w-full flex-col gap-3 p-5">
          <h1 className="text-4xl">Valitse alaleiri:</h1>
          <button onClick={() => selectSubcamp(2)}>
            <div className="px-auto w-full rounded-lg bg-buenos_aires p-1 text-3xl text-helsinki">
              Esimerkkileiri 2
            </div>
          </button>
          <button onClick={() => selectSubcamp(3)}>
            <div className="px-auto w-full rounded-lg bg-tokio p-1 text-3xl text-helsinki">
              Esimerkkileiri 3
            </div>
          </button>
          <button onClick={() => selectSubcamp(4)}>
            <div className="px-auto w-full rounded-lg bg-barcelona p-1 text-3xl text-helsinki">
              Esimerkkileiri 4
            </div>
          </button>
          <button onClick={() => selectSubcamp(5)}>
            <div className="px-auto w-full rounded-lg bg-green p-1 text-3xl text-helsinki">
              Esimerkkileiri 5
            </div>
          </button>
          <button onClick={() => selectSubcamp(1)}>
            <div className="px-auto w-full rounded-lg bg-soul p-1 text-3xl text-ateena">
              Esimerkkileiri 1
            </div>
          </button>
          <button onClick={() => selectSubcamp(6)}>
            <div className="px-auto w-full rounded-lg bg-helsinki p-1 text-3xl text-ateena">
              Esimerkkileiri 6
            </div>
          </button>
        </div>
      </div>
      <div className="absolute -z-10 h-screen w-screen lg:invisible">
        <img
          src="subcamp_page_background.svg"
          alt="background"
          className="fixed bottom-0 w-full"
        />
      </div>
    </div>
  )
}
