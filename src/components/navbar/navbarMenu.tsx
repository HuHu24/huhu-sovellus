import Link from "next/link";

interface NavbarMenuProps {
  // Array of pairs of titles and links assigned to them
  items: [string, string][]
  classes: string
}

const NavbarMenu = ({items, classes}: NavbarMenuProps) => {
  return (
    <div className={`${classes} fixed flex flex-col right-0 bottom-[70px] divide-y items-center pt-5 bg-gray  max-w-[240px] w-full h-[calc(100%-70px)] transition-all`}>
        {items.map((item, i)=>(
          <Link className="text-tokio font-poppins text-3xl py-3" href={item[1]} key={i}>{item[0]}</Link>
        ))}
    </div>
  )
} 

export default NavbarMenu