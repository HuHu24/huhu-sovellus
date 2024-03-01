import { auth } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"
import Link from "next/link"
import { useEffect, useState } from "react"

const NavbarMenu = (props: { classes: String }) => {
  const [isAuthenticated, setIsAuthenticaded] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setIsAuthenticaded(true)
        return
      }
      setIsAuthenticaded(false)
    })
  }, [])

  return (
    <div
      className={`${props.classes} fixed bottom-[70px] right-0 flex h-[calc(100%-70px)] w-full max-w-[240px] flex-col items-center  divide-y bg-gray pt-5 transition-all`}
    >
      {isAuthenticated ? (
        <>
          <Link className="py-3 font-poppins text-3xl text-tokio" href="/admin">
            Tekijäpaneeli
          </Link>
          <Link
            className="py-3 font-poppins text-3xl text-tokio"
            href="/auth/signout"
          >
            Kirjaudu ulos
          </Link>
        </>
      ) : (
        <Link
          className="py-3 font-poppins text-3xl text-tokio"
          href="/auth/signin"
        >
          Kirjaudu
        </Link>
      )}
      <Link className="py-3 font-poppins text-3xl text-tokio" href="/settings">
        Asetukset
      </Link>
    </div>
  )
}

export default NavbarMenu
