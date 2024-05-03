"use client"
import { signInAnonymously } from "@/firebase"
import { useRouter } from "next/navigation"
import { env } from "@/env"
import { saveMessagingToken } from "@/messaging"
import Link from "next/link"

export default function Home() {
  const router = useRouter()

  async function selectSubcamp(subcamp: string) {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("subcamp", subcamp)
      }
      await signInAnonymously()
      await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/claims/subcamp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subcamp: subcamp }),
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
          <button onClick={() => selectSubcamp("komodo")}>
            <div className="px-auto w-full rounded-lg bg-tokio p-1 text-3xl text-helsinki">
              Komodo{" "}
            </div>
          </button>
          <button onClick={() => selectSubcamp("centralPark")}>
            <div className="px-auto w-full rounded-lg bg-soul p-1 text-3xl text-helsinki">
              Central Park{" "}
            </div>
          </button>
          <button onClick={() => selectSubcamp("rio")}>
            <div className="px-auto w-full rounded-lg bg-green p-1 text-3xl text-helsinki">
              Rio{" "}
            </div>
          </button>
          <button onClick={() => selectSubcamp("bondiBeach")}>
            <div className="px-auto w-full rounded-lg bg-buenos_aires p-1 text-3xl text-helsinki">
              Bondi Beach{" "}
            </div>
          </button>
          <button onClick={() => selectSubcamp("matera")}>
            <div className="px-auto w-full rounded-lg bg-barcelona p-1 text-3xl text-helsinki">
              Matera
            </div>
          </button>
          <button onClick={() => selectSubcamp("aboa")}>
            <div className="px-auto w-full rounded-lg bg-ateena p-1 text-3xl text-helsinki">
              Tekijäleiri Aboa
            </div>
          </button>
          <div className="break-normal text-center">
            Käyttämällä sovellusta hyväksyt{" "}
            <Link className="text-soul underline" href={"/privacy-policy"}>
              tietosuojaselosteen
            </Link>
            ,{" "}
            <Link className="text-soul underline" href={"/cookies"}>
              evästeet
            </Link>{" "}
            ja{" "}
            <Link className="text-soul underline" href={"/terms"}>
              käyttöehdot
            </Link>
          </div>
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
