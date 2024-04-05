"use client"
import React, { useState, useEffect } from "react"
import { auth } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"
import Link from "next/link"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
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

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-0 left-0 z-20 flex w-full flex-row items-start justify-start">
      <div
        className={`${
          isOpen ? "visible" : "invisible"
        } fixed left-0 top-0 -z-10 h-[calc(100%-70px)] w-full bg-gray opacity-60`}
        onClick={toggle}
      />
      <div
        className={`${
          isOpen ? "right-0" : "right-[-250px]"
        } fixed bottom-[70px] flex h-[calc(100%-70px)] w-full max-w-[240px] flex-col items-center divide-y bg-gray pt-5 transition-all`}
      >
        <Link href="/chat" onClick={toggle}>
          <p className="py-3 font-poppins text-3xl text-tokio">Turvachat</p>
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/admin" onClick={toggle}>
              <p className="py-3 font-poppins text-3xl text-tokio">
                Tekijäpaneeli
              </p>
            </Link>
            <Link href="/auth/signout" onClick={toggle}>
              <p className="py-3 font-poppins text-3xl text-tokio">
                Kirjaudu ulos
              </p>
            </Link>
          </>
        ) : (
          <Link href="/auth/signin" onClick={toggle}>
            <p className="py-3 font-poppins text-3xl text-tokio">Kirjaudu</p>
          </Link>
        )}
        <Link href="/settings" onClick={toggle}>
          <p className="py-3 font-poppins text-3xl text-tokio">Asetukset</p>
        </Link>
      </div>
      <div
        className="box-border flex h-[70px] w-full shrink-0 flex-row items-center justify-between overflow-hidden bg-gray px-4"
        onClick={toggle}
      >
        <Link href="/" className="flex">
          <span className="material-symbols-outlined h-[48px] w-full text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]">
            cottage
          </span>
        </Link>
        <Link href="/releases" className="flex">
          <span className="material-symbols-outlined h-[48px] w-full text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]">
            full_coverage
          </span>
        </Link>
        <Link href="/timetable" className="flex">
          <span className="material-symbols-outlined h-[48px] w-full text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]">
            event_note
          </span>
        </Link>
        <Link href="/map" className="flex">
          <span className="material-symbols-outlined h-[48px] w-full text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]">
            distance
          </span>
        </Link>
        <div onClick={toggle}>
          <span
            className="material-symbols-outlined h-[48px] w-full cursor-pointer text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]"
            onClick={toggle}
          >
            more_horiz
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
