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
            <div className="w-screen h-[140px] relative bg-ateena bg-opacity-0 flex items-center">
                <div className="flex h-[140px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena">
                    <img className="h-full" src="huhuymp.png" alt=""/>
                </div>
                <div className="flex flex-col justify-center ml-[20px]">
                    <div className="text-ateena text-[20px] font-poppins text-shadow shadow-helsinki">{tiedot.otsikko}</div>
                    <div className="text-ateena text-[15px] font-opensauce text-shadow shadow-helsinki">{tiedot.julkaisupvm}<br/>{tiedot.julkaisija}<br/>{tiedot.kriittisyys}</div>
                </div>
            </div>
        </Link>
    )
}

const Releases = () => {
    return (
        <div className="overflow-y-auto h-[calc(100vh - 70px)] w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
export default Releases;
