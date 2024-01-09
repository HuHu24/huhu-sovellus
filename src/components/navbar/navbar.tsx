"use client"
import Link from "next/link"
import React from "react"
import { useState } from "react"

import NavbarMenu from "./navbarMenu"

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
      <NavbarMenu
        items={exampleItems}
        classes={`${isOpen ? "right-0" : "right-[-250px]"}`}
      ></NavbarMenu>
      <div className="box-border flex h-[70px] w-full shrink-0 flex-row items-center justify-between overflow-hidden bg-gray px-4">
        <NavbarButton link={"/"} icon={"cottage"}></NavbarButton>
        <NavbarButton
          link={"/tiedotteet"}
          icon={"full_coverage"}
        ></NavbarButton>
        <NavbarButton link={"/aikataulu"} icon={"event_note"}></NavbarButton>
        <NavbarButton link={"/kartta"} icon={"distance"}></NavbarButton>
        <div onClick={toggle}>
          <span
            className="material-symbols-outlined text-[64px] text-tokio h-[64px] w-full cursor-pointer"
            onClick={toggle}
          >
            more_horiz
          </span>
        </div>
      </div>
    </div>
  )
}

interface NavbarButtonProps {
  link: string
  icon: string
}

const NavbarButton = ({ link, icon }: NavbarButtonProps) => {
  return (
    <Link href={link} className="flex">
      <span className="material-symbols-outlined text-[64px] text-tokio h-[64px] w-full">
        {icon}
      </span>
    </Link>
  )
}

export default Navbar
