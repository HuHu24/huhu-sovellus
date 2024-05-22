"use client"

import { signInWithCustomToken } from "@/firebase"
import { env } from "@/env"
import Link from "next/link"
import Loading from "@/components/loading"
import { useState } from "react"

export default function Subcamp() {
  const [subcampSelected, setSubcampSelected] = useState(false)
  async function selectSubcamp(subcamp: string) {
    setSubcampSelected(true)
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("subcamp", subcamp)
      }
      await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subcamp }),
      }).then((response) => {
        response
          .json()
          .then(async (data) => await signInWithCustomToken(data.customToken))
      })
    } catch (e) {
      console.error("Selecting subcamp failed:", e)
    }
  }
  return (
    <>
      <div className="absolute z-30 flex h-screen w-full place-content-center place-items-center overflow-hidden break-all bg-helsinki text-center font-poppins text-ateena">
        <div className="mx-4 my-auto flex w-full max-w-[500px] flex-col items-center justify-between gap-3 rounded-[20px] bg-oslo p-5 py-2.5">
          <h1 className="text-4xl">Valitse alaleiri:</h1>
          <button
            onClick={() => selectSubcamp("komodo")}
            className="px-auto w-full rounded-lg bg-tokio p-1 text-3xl text-helsinki"
          >
            Komodo
          </button>
          <button
            onClick={() => selectSubcamp("centralPark")}
            className="px-auto w-full rounded-lg bg-soul p-1 text-3xl text-helsinki"
          >
            Central Park
          </button>
          <button
            onClick={() => selectSubcamp("rio")}
            className="px-auto w-full rounded-lg bg-green p-1 text-3xl text-helsinki"
          >
            Rio
          </button>
          <button
            onClick={() => selectSubcamp("bondiBeach")}
            className="px-auto w-full rounded-lg bg-buenos_aires p-1 text-3xl text-helsinki"
          >
            Bondi Beach
          </button>
          <button
            onClick={() => selectSubcamp("matera")}
            className="px-auto w-full rounded-lg bg-barcelona p-1 text-3xl text-helsinki"
          >
            Matera
          </button>
          <button
            onClick={() => selectSubcamp("aboa")}
            className="px-auto w-full rounded-lg bg-ateena p-1 text-3xl text-helsinki"
          >
            Tekijäleiri Aboa
          </button>
          <div className="break-normal text-center">
            {"Käyttämällä sovellusta hyväksyt "}
            <Link className="text-soul underline" href={"/privacy-policy"}>
              tietosuojaselosteen
            </Link>
            {", "}
            <Link className="text-soul underline" href={"/cookies"}>
              evästeet
            </Link>
            {" ja "}
            <Link className="text-soul underline" href={"/terms"}>
              käyttöehdot
            </Link>
          </div>
          <Loading text={"Alaleiria valitaan"} load={subcampSelected} />
        </div>
      </div>
    </>
  )
}
