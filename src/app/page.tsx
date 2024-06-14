import { env } from "@/env"
import Link from "next/link"

export default async function Home() {
  return (
    <div className="flex h-full flex-col place-content-center place-items-center gap-2">
      <img
        className="aspect-square h-[30vh]"
        src={`${env.NEXT_PUBLIC_URL}/huhuymp.png`}
      />
      <h1 className="text-center font-poppins text-5xl font-bold text-ateena">
        Kiitos muistoista ja kokemuksista
      </h1>
      <p className="text-center font-opensauce text-2xl text-ateena">
        HuHu-sovellus on suljettu
      </p>
      <div className="break-normal text-center">
        <Link className="text-soul underline" href={"/privacy-policy"}>
          Tietosuojaseloste
        </Link>
        {", "}
        <Link className="text-soul underline" href={"/cookies"}>
          Evästeet
        </Link>
        {", "}
        <Link className="text-soul underline" href={"/terms"}>
          Käyttöehdot
        </Link>
      </div>
    </div>
  )
}
