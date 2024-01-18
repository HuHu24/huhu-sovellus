import Link from "next/link"

const tiedot = {
  otsikko: "Ruoka peruttu",
  teksti:
    "Joo safka ei oo hoitanut hommaansa niin kuollaan nälkään. Syy kissan karv...",
  kuva: "huhuymp.png",
  julkaisija: "Minä/osaalue",
  kriittisyys: "Kriittinen",
  julkaisupvm: "6.9.2222",
}
export const Release = () => {
  return (
    <Link href={"/releases/release"} className="z-10">
      <div className="flex items-center bg-ateena bg-opacity-0">
        <div className="flex h-[140px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena">
          <img className="h-full" src="huhuymp.png" alt="" />
        </div>
        <div className="ml-[20px] flex w-[150px] flex-col justify-center">
          <div className="text-overflow-ellipsis overflow-hidden whitespace-nowrap break-all font-poppins text-[18px] text-ateena shadow-helsinki text-shadow">
            {tiedot.otsikko}
          </div>
          <div className="break-all font-opensauce text-[15px] shadow-helsinki text-shadow">
            {tiedot.julkaisupvm}
            <br />
            {tiedot.julkaisija}
            <br />
            {tiedot.kriittisyys}
          </div>
        </div>
      </div>
    </Link>
  )
}
