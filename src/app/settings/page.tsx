"use client"

import { env } from "@/env"
import { useEffect, useState } from "react"
import { saveMessagingToken } from "@/messaging"
import {
  AuthCredential,
  deleteUser as fbDeleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth"
import { getAuth } from "@firebase/auth"
import { signOut } from "@/firebase"
export default function Home() {
  const [userSettings, setUserSettings] = useState<any>()
  const [overlay, toggleOverlay] = useState<any>()
  const [jobStatus, setJobStatus] = useState(userSettings?.claims.job)

  const fetchUserSettings = async () => {
    const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/auth`)
    return await response.json()
  }

  useEffect(() => {
    fetchUserSettings().then((data) => {
      setUserSettings(data)
    })
  }, [])
  const userSubcamp = userSettings?.claims.subcamp

  const enableOverlay = () => {
    toggleOverlay(!overlay)
    console.log("User settings", userSettings)
    console.log("subcamp", userSubcamp)
  }
  const deleteUser = async () => {
    try {
      const user = getAuth()

      if (!user.currentUser) {
        alert(
          "Ongelma poistaessa käyttäjää. Sinun pitää olla kirjautunut sisään, että voit poistaa käyttäjäsi."
        )
        return
      }

      if (user.currentUser.email !== null) {
        let password = null
        do {
          password = prompt(
            "Lisää salasanasi kirjautuakseen uudelleen operaatiota varten"
          )
        } while (password == null)

        let credential: AuthCredential = EmailAuthProvider.credential(
          user.currentUser.email,
          password
        )

        if (credential === null) {
          alert("Ongelmia kirjautuessa sisään uudestaan")
          return
        }

        await reauthenticateWithCredential(user.currentUser, credential)

        await fbDeleteUser(user.currentUser)

        alert("Käyttäjä poistettu")
        location.replace("/auth/signout")
      } else {
        await signOut()

        alert("Käyttäjä poistettu")
        location.replace("/auth/signout")
      }
    } catch (e: any) {
      console.error(e)
      alert("Ongelma poistaessa käyttäjää: " + e.message)
    }
  }
  const enableMessaging = async () => {
    const messagingToken = await saveMessagingToken()
    if (userSubcamp)
      await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subcamp: userSubcamp, token: messagingToken }),
      })
    else {
      alert("Valitse alaleiri")
    }
  }
  const toggleJob = async (job: boolean) => {
    try {
      await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job: job }),
      })
      setJobStatus(job)
    } catch (e) {
      console.error("Changing job failed:", e)
    }
  }
  async function selectSubcamp(subcamp: string) {
    try {
      const messagingToken = await saveMessagingToken()
      if (messagingToken) {
        await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/subcamp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subcamp: subcamp,
            messagingToken: messagingToken,
          }),
        })
      } else {
        await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/subcamp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subcamp: subcamp,
            messagingToken: messagingToken,
          }),
        })
        if (typeof window !== "undefined") {
          localStorage.setItem("subcamp", subcamp)
        }
        alert("Alaleiri valittu")
      }
    } catch (e) {
      console.error("Selecting subcamp failed:", e)
    }
    toggleOverlay(!overlay)
  }

  return (
    <>
      {overlay ? (
        <div className="absolute h-full w-full bg-buenos_aires">
          <div className="flex h-screen w-full place-content-center place-items-center text-center font-poppins">
            <div className="mx-4 my-auto flex w-full max-w-[500px] flex-col place-items-center gap-3 rounded-[20px] bg-oslo p-4">
              <h1 className="text-2xl font-bold">Alaleirin valinta</h1>
              <button
                onClick={() => selectSubcamp("komodo")}
                className="h-10 w-full rounded-lg bg-tokio p-1 text-xl text-helsinki"
              >
                Komodo
              </button>
              <button
                onClick={() => selectSubcamp("centralPark")}
                className="h-10 w-full rounded-lg bg-soul p-1 text-xl text-helsinki"
              >
                Central Park{" "}
              </button>
              <button
                onClick={() => selectSubcamp("rio")}
                className="h-10 w-full rounded-lg bg-green p-1 text-xl text-helsinki"
              >
                Rio{" "}
              </button>
              <button
                onClick={() => selectSubcamp("bondiBeach")}
                className="h-10 w-full rounded-lg bg-buenos_aires p-1 text-xl text-helsinki"
              >
                Bondi Beach{" "}
              </button>
              <button
                onClick={() => selectSubcamp("matera")}
                className="h-10 w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki"
              >
                Matera{" "}
              </button>
              <button
                onClick={() => selectSubcamp("aboa")}
                className="h-10 w-full rounded-lg bg-ateena p-1 text-xl text-helsinki"
              >
                Tekijäleiri Aboa{" "}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex h-screen w-full place-content-center place-items-center text-center font-poppins">
        <div className="mx-4 my-auto flex w-full max-w-[500px] flex-col place-items-center gap-3 rounded-[20px] bg-oslo p-4">
          <h1 className="text-2xl font-bold">Asetukset</h1>
          <button
            onClick={() => deleteUser()}
            className="h-10 w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki"
          >
            Poista käyttäjä
          </button>
          <button
            onClick={() => enableMessaging()}
            className="h-10 w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki"
          >
            Ilmoitukset
          </button>
          <button
            onClick={() => enableOverlay()}
            className="h-10 w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki"
          >
            Valitse alaleiri
          </button>
          <button
            onClick={() => toggleJob(!jobStatus)}
            className="h-auto w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki"
          >
            {jobStatus ? (
              <>
                Vaihda Samoajaksi/Osallistujaksi
                <br />
                (Vaikuttaa vain kalenteriin)
              </>
            ) : (
              <>
                Vaihda Tekijäksi/Vaeltajaksi
                <br />
                (Vaikuttaa vain kalenteriin)
              </>
            )}
          </button>
        </div>
      </div>
    </>
  )
}
