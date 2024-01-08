import Link from "next/link"
import image from "next/image"
const tiedot = {
  otsikko: "Ruoka peruttu",
  teksti:
    "Joo safka ei oo hoitanut hommaansa niin kuollaan nälkään. Syy kissan karv...",
  kuva: "/public/huhuymp.png",
}

const Tiedote = () => {
  return (
    <Link href={"/"} className="z-10">
      <div className="mr-4 flex flex-col">
        <div className="flex h-[150px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena">
             <img className="h-full"
               src="/huhu-sovellus/huhuymp.png"
               alt=""
             />
           </div>
        <div className="w-[180px] whitespace-normal font-poppins font-normal text-ateena text-shadow">
          {tiedot.otsikko}
        </div>
        <div className="h-[76px] w-full overflow-hidden whitespace-normal font-opensauce text-sm font-normal text-ateena text-shadow">
          {tiedot.teksti} sdf sdf sdklöfjklös klösjkldfjklsdjkl jklsfjkls sdf
          sdf sjksdjfsjkldfsjd sdfsdf sdfsd sdfsdfsdf
        </div>
      </div>
    </Link>
  )
}

const Tiedotteet = () => {
  return (
    <div className="flex overflow-x-auto">
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
      <Tiedote />
    </div>
  )
}

export default Tiedotteet
