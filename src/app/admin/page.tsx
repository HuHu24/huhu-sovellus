import Link from "next/link"
import React from "react"
import { cookies } from "next/headers"
import { env } from "@/env"

export default async function AdminFrontpage() {
  const session = cookies().get("session")?.value || ""
  const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/auth`, {
    headers: {
      Cookie: `session=${session || ""}`,
    },
  })
  const data = (await response.json()) as {
    claims: {
      admin: boolean
      subcampLeader: boolean
      safety: boolean
      activity: boolean
      upkeep: boolean
    }
    email: string
  }

  return (
    <>
      <div className="relative h-full w-full overflow-hidden bg-helsinki">
        <div className="bg-white inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-opacity-0 p-2.5">
          <div className="bg-white inline-flex items-center justify-between self-stretch bg-opacity-0">
            <div className="absolute h-12 w-12"></div>
            <div className="material-symbols-outlined z-10 text-[49px] text-tokio">
              <a href="./">arrow_left_alt</a>
            </div>

            <div className="z-10 font-opensauce text-4xl font-normal text-tokio ">
              Tekijäpaneeli
              <div className="z-10 font-opensauce text-xl font-normal text-ateena ">
                {data.email}
              </div>
            </div>
          </div>
        </div>
        <div className="-20 mt-1 flex h-full w-full flex-col gap-4 overflow-auto p-3">
          {data.claims?.admin ||
          data.claims?.safety ||
          data.claims?.subcampLeader ||
          data.claims?.activity ||
          data.claims?.upkeep ? null : (
            <h1 className="absolute top-1/2 ml-4 align-middle  font-poppins text-2xl">
              Pyydä oikeuksia sovelluskehittäjiltä
            </h1>
          )}
          <div className="z-20 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <>
              {(data.claims && data.claims?.safety) ||
              (data.claims && data.claims?.admin) ? (
                <Link href={"/admin/chat"}>
                  <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-soul">
                    <span className="material-symbols-outlined text-9xl">
                      forum
                    </span>
                    <h3 className="text-2xl">Turvachat</h3>
                  </div>
                </Link>
              ) : (
                <></>
              )}
            </>
            <>
              {(data.claims && data.claims?.subcampLeader) ||
              (data.claims && data.claims?.admin) ? (
                <Link href={"/admin/subcamp-chat"}>
                  <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-buenos_aires text-helsinki">
                    <span className="material-symbols-outlined text-9xl">
                      forum
                    </span>
                    <h3 className="text-2xl">Alaleirichat</h3>
                  </div>
                </Link>
              ) : (
                <></>
              )}
            </>
            <>
              {(data.claims && data.claims?.subcampLeader) ||
              (data.claims && data.claims?.admin) ? (
                <>
                  <Link href={"/admin/releases"}>
                    <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-tokio text-helsinki">
                      <span className="material-symbols-outlined text-9xl">
                        full_coverage
                      </span>
                      <h3 className="text-2xl">Tiedotteet</h3>
                    </div>
                  </Link>
                  <Link href={"/admin/notifications"}>
                    <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-oslo">
                      <span className="material-symbols-outlined text-9xl">
                        notifications_active
                      </span>
                      <h3 className="text-2xl">Ilmoitukset</h3>
                    </div>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </>
            {(data.claims && data.claims?.activity) || data.claims?.admin ? (
              <Link href={"/admin/activities"}>
                <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-barcelona text-helsinki">
                  <span className="material-symbols-outlined text-9xl">
                    sports_soccer
                  </span>
                  <h3 className="text-2xl">Ohjelma</h3>
                </div>
              </Link>
            ) : (
              <></>
            )}
            {(data.claims && data.claims?.upkeep) || data.claims?.admin ? (
              <Link href={"/admin/upkeep"}>
                <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-ateena text-helsinki">
                  <span className="material-symbols-outlined text-9xl">
                    build
                  </span>
                  <h3 className="text-2xl">Puutteet</h3>
                </div>
              </Link>
            ) : (
              <></>
            )}
            {data.claims && data.claims?.admin ? (
              <Link href={"/admin/access"}>
                <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-buenos_aires text-helsinki">
                  <span className="material-symbols-outlined text-9xl">
                    lock
                  </span>
                  <h3 className="text-2xl">Oikeudet</h3>
                </div>
              </Link>
            ) : (
              <></>
            )}
          </div>
          <p>
            <br />
            <br />
            <br />
          </p>
        </div>
      </div>
    </>
  )
}
