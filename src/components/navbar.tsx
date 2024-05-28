"use client"
import React, { useEffect, useState } from "react"
import { auth } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"
import Link from "next/link"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [safetyIsOpen, setSafetyIsOpen] = useState(false)
  const [infoIsOpen, setInfoIsOpen] = useState(false)
  const [allowOpen, setAllowOpen] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    })
  }, [])

  return (
    <div className="fixed bottom-0 left-0 z-20 flex w-full flex-row items-start justify-start">
      <div
        className={`${
          isOpen ? "visible" : "invisible"
        } fixed left-0 top-0 -z-10 h-[calc(100%-70px)] w-full bg-gray opacity-60`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`${
          isOpen ? "right-0" : "right-[-250px]"
        } fixed bottom-[70px] flex h-[calc(100%-70px)] w-full max-w-[250px] flex-col items-center divide-y bg-gray pt-5 transition-all`}
      >
        <Link
          href="/info/subcamp"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <p className="py-3 font-poppins text-3xl text-tokio">Alaleirit</p>
        </Link>
        <Link
          href="/subcamp-chat"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <p className="py-3 font-poppins text-3xl text-tokio">Alaleirichat</p>
        </Link>
        <Link
          href="/info/song-lyrics"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <p className="py-3 font-poppins text-3xl text-tokio">
            Leiribiisin sanat
          </p>
        </Link>
        <button
          onClick={() => {
            setSafetyIsOpen(!safetyIsOpen)
          }}
          className="max-w-[90%] py-3 font-poppins text-3xl text-tokio"
        >
          <div className="flex">
            Turvallisuus
            <span
              className={`${
                safetyIsOpen ? "rotate-0" : "-rotate-90"
              } material-symbols-outlined w-full text-4xl text-tokio transition`}
            >
              expand_more
            </span>
          </div>
          {safetyIsOpen ? (
            <div className="px-3 text-left text-2xl">
              <ul>
                <Link onClick={() => setIsOpen(false)} href="/safety-chat">
                  <li>Turvachat</li>
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/info/safety">
                  <li>Turvallisuuden tiedot</li>
                </Link>
                <Link onClick={() => setIsOpen(false)} href="/info/ttp">
                  <li>Turvallisen tilan periaatteet</li>
                </Link>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </button>
        <Link
          href="/cafe"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <p className="py-3 font-poppins text-3xl text-tokio">Kahvila</p>
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/admin" onClick={() => setIsOpen(false)}>
              <p className="py-3 font-poppins text-3xl text-tokio">
                Tekijäpaneeli
              </p>
            </Link>
            <Link href="/auth/signout" onClick={() => setIsOpen(false)}>
              <p className="py-3 font-poppins text-3xl text-tokio">
                Kirjaudu ulos
              </p>
            </Link>
          </>
        ) : (
          <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
            <p className="py-3 font-poppins text-3xl text-tokio">Kirjaudu</p>
          </Link>
        )}
        <button
          onClick={() => {
            setInfoIsOpen(!infoIsOpen)
          }}
          className="max-w-[90%] py-3 font-poppins text-3xl text-tokio"
        >
          <div className="flex text-left text-3xl">
            Tietoa
            <span
              className={`${
                infoIsOpen ? "rotate-0" : "-rotate-90"
              } material-symbols-outlined w-full text-center text-4xl text-tokio transition`}
            >
              expand_more
            </span>
          </div>
          {infoIsOpen ? (
            <div className="px-3 text-left text-2xl">
              <ul>
                <Link href="/terms" onClick={() => setIsOpen(false)}>
                  <li>Käyttöehdot</li>
                </Link>
                <Link href="/privacy-policy" onClick={() => setIsOpen(false)}>
                  <li>Tietosuojaseloste</li>
                </Link>
                <Link href="/cookies" onClick={() => setIsOpen(false)}>
                  <li>Evästeet</li>
                </Link>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </button>
        <Link href="/settings" onClick={() => setIsOpen(false)}>
          <p className="py-3 font-poppins text-3xl text-tokio">Asetukset</p>
        </Link>
      </div>
      <div className="box-border flex h-[70px] w-full shrink-0 flex-row items-center justify-between overflow-hidden bg-gray px-4">
        <Link href="/" className="flex">
          <span
            className="material-symbols-outlined h-[48px] w-full text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]"
            onClick={() => setIsOpen(false)}
          >
            home
          </span>
        </Link>
        <Link href="/releases" className="flex">
          <span
            className="material-symbols-outlined h-[48px] w-full text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]"
            onClick={() => setIsOpen(false)}
          >
            breaking_news
          </span>
        </Link>
        <Link href="/timetable" className="flex">
          <span
            className="material-symbols-outlined h-[48px] w-full text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]"
            onClick={() => setIsOpen(false)}
          >
            calendar_month
          </span>
        </Link>
        <Link href="/map" className="flex">
          <span
            className="material-symbols-outlined h-[48px] w-full text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]"
            onClick={() => setIsOpen(false)}
          >
            map
          </span>
        </Link>
        <div
          onClick={() => {
            if (allowOpen) setIsOpen(!isOpen)
          }}
        >
          <span
            className="material-symbols-outlined h-[48px] w-full cursor-pointer text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]"
            onClick={() => {
              if (allowOpen) setIsOpen(!isOpen)
            }}
          >
            more_horiz
          </span>
        </div>
      </div>
    </div>
  )
}
export default Navbar
