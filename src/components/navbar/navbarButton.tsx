import Link from "next/link"
import React from "react"

interface NavbarButtonProps {
  link: string
  icon: string
}

export const NavbarButton = ({ link, icon }: NavbarButtonProps) => {
  return (
    <Link href={link} className="flex">
      <span className="material-symbols-outlined h-[48px] w-full text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]">
        {icon}
      </span>
    </Link>
  )
}
