"use client"

import Link from "next/link"
import { useState } from "react"

const tiedot = {
  id: 1,
  otsikko: "Ruoka peruttu",
  teksti:
    "Joo safka ei oo hoitanut hommaansa niin kuollaan nälkään. Syy kissan karv...",
  kuva: "huhuymp.png",
  julkaisija: "Minä/osaalue",
  kriittisyys: "Kriittinen",
  julkaisupvm: "6.9.2222",
}
export const Release = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="z-10">
      <div className="flex items-center bg-ateena bg-opacity-0">
        <Link
          href={"./releases/release"}
          className="flex h-[140px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena"
        >
          <img className="h-full" src="huhuymp.png" alt="" />
        </Link>
        <div className="ml-1 flex w-[200px] flex-col justify-center">
          <div className="text-overflow-ellipsis overflow-hidden whitespace-nowrap break-all font-poppins text-[18px] text-ateena shadow-helsinki text-shadow">
            {tiedot.otsikko}
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="break-all font-opensauce text-[15px] shadow-helsinki text-shadow"
          >
            {"julkaistu: " + tiedot.julkaisupvm}
            <br />
            {"julkaisija: " + tiedot.julkaisija}
            <br />
            {"kriittisyys: " + tiedot.kriittisyys}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="material-symbols-outlined z-20 mt-1 flex justify-between text-[49px] text-tokio"
          >
            <a>visibility_lock</a>
            <a>keyboard_arrow_down</a>
          </button>
        </div>
      </div>
      {isOpen ? (
        <div
          className="relative z-10 flex h-[50px] w-full rounded-[10px] bg-soul"
          style={{ justifyContent: "space-between" }}
        >
          <div className="flex" style={{ justifyContent: "space-between" }}>
            <Link
              href={"./releases/release/edit"}
              className="material-symbols-outlined text-[50px] text-ateena"
            >
              visibility
            </Link>
            <p className="-mt-1.5 ml-2 font-opensauce text-[40px]">200</p>
          </div>
          <div>
            <Link
              href={"./notifications/release/"}
              className="material-symbols-outlined text-[50px] text-ateena"
            >
              notifications_active
            </Link>
            <Link
              href={"./releases/release"}
              className="material-symbols-outlined mr-2 text-[50px] text-ateena"
            >
              edit
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  )
}
