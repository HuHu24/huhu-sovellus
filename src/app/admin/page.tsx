import Link from "next/link"
import React from "react"
import { cookies } from "next/headers"

export default async function AdminFrontpage() {
  const session = cookies().get("session")?.value || ""
  const response = await fetch("http://localhost:3000/huhu-sovellus/api/auth", {
    headers: {
      Cookie: `session=${session || ""}`,
    },
  })
  const data = (await response.json()) as {
    claims: { admin: boolean; subcampLeader: boolean; safety: boolean }
  }

  console.log("Admin page:")
  console.log(data.claims)

  return (
    <>
      <div className="relative h-full w-full overflow-hidden bg-helsinki">
        <div className="bg-white inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-opacity-0 p-2.5">
          <div className="bg-white inline-flex items-center justify-between self-stretch bg-opacity-0">
            <div className="absolute h-12 w-12"></div>
            <div className="material-symbols-outlined z-10 text-[49px] text-helsinki">
              <a href="./">arrow_left_alt</a>
            </div>
            <div className="z-10 font-opensauce text-4xl font-normal text-tokio ">
              Tekijäpaneeli
            </div>
          </div>
        </div>
        <div className="absolute -left-44 -top-72 z-0 p-2.5">
          <div className="z-0 inline-flex h-[369px] w-[360px] items-end justify-start gap-2.5">
            <div className="z-0 shrink grow basis-0 self-stretch rounded-full bg-buenos_aires" />
          </div>
        </div>
        <div className="absolute -bottom-48 -right-48 p-2.5 ">
          <div className="inline-flex h-[341px] w-[341px] flex-col items-end justify-start gap-2.5">
            <div className="shrink grow basis-0 self-stretch rounded-full bg-barcelona" />
          </div>
        </div>
        <div className="-20 -mt-3 flex h-full w-full flex-col gap-4 overflow-auto p-3">
          <div className="z-20 w-full rounded-[20px] bg-oslo p-2">
            <p className="text-2xl">Uusia yhteydenottoja: 0</p>
            <div></div>
          </div>
          {!data.claims.admin &&
            !data.claims.safety &&
            !data.claims.subcampLeader && (
              <h1 className="absolute top-1/2 ml-4 align-middle  font-poppins text-2xl">
                Pyydä oikeuksia sovelluskehittäjiltä
              </h1>
            )}
          <div className="z-20 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <>
              {(data.claims && data.claims.safety) ||
              (data.claims && data.claims.admin) ? (
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
              {(data.claims && data.claims.subcampLeader) ||
              (data.claims && data.claims.admin) ? (
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
            {data.claims && data.claims.admin ? (
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
        </div>
      </div>
    </>
  )
}
