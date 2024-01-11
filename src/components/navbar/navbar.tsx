"use client"
import React, {useState} from "react"

import NavbarMenu from "./navbarMenu"
import {NavbarButton} from "@/components/navbar/navbarButton";

const exampleItems: [string, string][] = [
  ["Asetukset", "/settings"],
  ["Jotain muuta", "/misc"],
  ["Tietoa meistä", "/about"],
]

const Navbar = () => {
  const [isOpen, setState] = useState<boolean>(false)
  const toggle = () => {
    if (isOpen) setState(false)
    else setState(true)
  }

  return (
    <div className="fixed bottom-0 left-0 z-20 flex w-full flex-row items-start justify-start">
      <div
        className={`${
          isOpen ? "visible" : "invisible"
        } fixed left-0 top-0 h-[calc(100%-70px)] w-full bg-gray opacity-60`}
        onClick={toggle}
      />
      <NavbarMenu
        items={exampleItems}
        classes={`${isOpen ? "right-0" : "right-[-250px]"}`}
      ></NavbarMenu>
      <div className="box-border flex h-[70px] w-full shrink-0 flex-row items-center justify-between overflow-hidden bg-gray px-4">
        <NavbarButton link={"/"} icon={"cottage"}></NavbarButton>
        <NavbarButton link={"/releases"} icon={"full_coverage"}></NavbarButton>
        <NavbarButton link={"/timetable"} icon={"event_note"}></NavbarButton>
        <NavbarButton link={"/map"} icon={"distance"}></NavbarButton>
        <div onClick={toggle}>
          <span
            className="material-symbols-outlined smallPhone:h-[64px] smallPhone:text-[64px] h-[48px] w-full cursor-pointer text-[48px] text-tokio"
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
