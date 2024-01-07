import Link from "next/link"

interface NavbarMenuProps {
  // Array of pairs of titles and links assigned to them
  items: [string, string][]
  classes: string
}

const NavbarMenu = ({ items, classes }: NavbarMenuProps) => {
  return (
    <div
      className={`${classes} fixed bottom-[70px] right-0 flex h-[calc(100%-70px)] w-full max-w-[240px] flex-col items-center  divide-y bg-gray pt-5 transition-all`}
    >
      {items.map((item, i) => (
        <Link
          className="py-3 font-poppins text-3xl text-tokio"
          href={item[1]}
          key={i}
        >
          {item[0]}
        </Link>
      ))}
    </div>
  )
}

export default NavbarMenu
