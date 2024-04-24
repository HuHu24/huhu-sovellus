import Link from "next/link"
import React from "react"

export default function Home() {
  return (
    <div className="m-5 flex flex-col gap-3">
      <div className="z-20 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Link href={"/admin/chat"}>
          <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-soul p-2">
            <h3 className="text-2xl">Toiminta hätätilanteessa</h3>
          </div>
        </Link>
        <Link href={"/admin/releases"}>
          <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-tokio text-helsinki">
            <span className="material-symbols-outlined text-9xl">
              full_coverage
            </span>
            <h3 className="text-2xl">Alaleirit</h3>
          </div>
        </Link>
        <Link href={"/admin/notifications"}>
          <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-oslo">
            <span className="material-symbols-outlined text-9xl">
              notifications_active
            </span>
            <h3 className="text-2xl">Turvallisuus</h3>
          </div>
        </Link>
        <Link href={"/admin/access"}>
          <div className="flex aspect-square flex-col place-content-center place-items-center rounded-[20px] bg-buenos_aires text-helsinki">
            <span className="material-symbols-outlined text-9xl">lock</span>
            <h3 className="text-2xl">Jotain muuta</h3>
          </div>
        </Link>
      </div>
    </div>
  )
}
