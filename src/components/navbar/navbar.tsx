"use client"
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'

import NavbarMenu from './navbarMenu'

const exampleItems : [string,string][] = [["Asetukset","/settings"], ["Jotain muuta", "/misc"], ["Tietoa meistä", "/about"]]

const Navbar = () => {
    const [isOpen, setState] = useState<boolean>(false);
    const toggle = () => {
        if (isOpen) setState(false);
        else setState(true);
    };

  return (
    <div className="fixed bottom-0 left-0 w-full flex flex-row items-start justify-start">
        <NavbarMenu items={exampleItems} classes={`${isOpen ? "right-0" : "right-[-250px]"}`}></NavbarMenu>
        <div className="bg-gray px-4 w-full h-[70px] overflow-hidden shrink-0 flex flex-row items-center justify-between box-border">
            <NavbarButton link={'/'} icon={'cottage'}></NavbarButton>
            <NavbarButton link={'/tiedotteet'} icon={'full_coverage'}></NavbarButton>
            <NavbarButton link={'/aikataulu'} icon={'event_note'}></NavbarButton>
            <NavbarButton link={'/kartta'} icon={'distance'}></NavbarButton>
            <div onClick={toggle}>
                <NavbarButton link={''} icon={'more_horiz'}/>
            </div>
        </div>
    </div>
  )
}

interface NavbarButtonProps {
    link: string,
    icon: string
}

const NavbarButton = ({link, icon}: NavbarButtonProps) => {
    return (
        <Link href={link} className='flex'>
            <span className='material-symbols-outlined  icon-navbar w-full h-[64px]' >{icon}</span>
        </Link>
    )
}

export default Navbar