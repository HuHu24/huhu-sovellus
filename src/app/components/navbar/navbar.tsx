"use client"
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'

import NavbarMenu from './navbarMenu'

const exampleItems : [string,string][] = [["Asetukset","/settings"], ["Jotain muuta", "/misc"], ["Tietoa meistä", "/about"]]

const Navbar = () => {
    const [isOpen, setState] = useState(0);
    const toggle = () => {
        if (isOpen == 1) setState(0);
        else setState(1);
    };

  return (
    <div className="fixed bottom-0 left-0 w-full flex flex-row items-start justify-start">
        <NavbarMenu items={exampleItems} classes={`${isOpen ? "visible" : "invisible w-0"}`}/>
        <div className="bg-gray w-full h-[70px] overflow-hidden shrink-0 flex flex-row items-center justify-between box-border">
            <NavBarButton link={'/'} icon={'cottage'}/>
            <NavBarButton link={'/tiedotteet'} icon={'full_coverage'}/>
            <NavBarButton link={'/aikataulu'} icon={'event_note'}/>
            <NavBarButton link={'/kartta'} icon={'distance'}/>
            <div onClick={toggle}>
                <NavBarButton link={''} icon={'more_horiz'}/>
            </div>
        </div>
    </div>
  )
}

interface NavBarButtonProps {
    link: string,
    icon: string
}

const NavBarButton = ({link, icon}: NavBarButtonProps) => {
    return (
        <Link href={link} className='flex'>
            <span className='material-symbols-outlined  icon-navbar w-full h-[64px]' >{icon}</span>
        </Link>
    )
}

export default Navbar