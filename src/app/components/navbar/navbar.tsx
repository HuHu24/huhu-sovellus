import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    // <div >
    //     <NavBarButton link={'/home'}></NavBarButton>
    // </div>
    <div className="relative w-full flex flex-row items-start justify-start">
<div className="bg-gray w-full h-[70px] overflow-hidden shrink-0 flex flex-row items-center justify-between py-0 px-2.5 box-border">
    <NavBarButton link={'/'} icon={'cottage'}></NavBarButton>
    <NavBarButton link={'/tiedotteet'} icon={'full_coverage'}></NavBarButton>
    <NavBarButton link={'/aikataulu'} icon={'event_note'}></NavBarButton>
    <NavBarButton link={'/kartta'} icon={'distance'}></NavBarButton>
    <NavBarButton link={''} icon={'more_horiz'}></NavBarButton>
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
        <Link href={link}>
            <span className='material-symbols-outlined  icon-navbar w-full h-full' >{icon}</span>
        </Link>
    )
}

export default Navbar