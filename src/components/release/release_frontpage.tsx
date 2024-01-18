import Link from "next/link"

const tiedot = {
  otsikko: "Ruoka peruttu",
  teksti:
    "Joo safka ei oo hoitanut hommaansa niin kuollaan nälkään. Syy kissan karv...",
  kuva: "/public/huhuymp.png",
}

const Release = () => {
  return (
    <Link href={"/releases/release"} className="z-10">
      <div className="mr-4 flex flex-col">
        <div className="flex h-[150px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena">
          <img className="h-full" src="huhuymp.png" alt="" />
        </div>
        <div className="w-[180px] whitespace-normal font-poppins font-normal text-ateena shadow-helsinki text-shadow">
          {tiedot.otsikko}
        </div>
        <div className="h-[76px] w-full overflow-hidden whitespace-normal font-opensauce text-sm font-normal text-ateena shadow-helsinki text-shadow">
          {tiedot.teksti} sdf sdf sdklöfjklös klösjkldfjklsdjkl jklsfjkls sdf
          sdf sjksdjfsjkldfsjd sdfsdf sdfsd sdfsdfsdf
        </div>
      </div>
    </Link>
  )
}

const Releases = () => {
  return (
    <div className="flex overflow-x-auto">
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
      <Release />
    </div>
  )
}

export default Releases
