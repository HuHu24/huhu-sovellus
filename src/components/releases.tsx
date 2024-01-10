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

const Release = () => {
  return (
    <Link href={"/"} className="z-10">
      <div className="relative flex h-[140px] w-screen items-center bg-ateena bg-opacity-0">
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

const Releases = () => {
  return (
    <div className="h-[calc(100vh - 70px)] w-full overflow-y-auto">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
    </div>
  )
}
export default Releases