import Link from "next/link"

export default function Map() {
  return (
    <>
      <div className="inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-oslo p-2.5">
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="absolute h-12 w-12"></div>
          <div className="material-symbols-outlined z-10 text-[49px] text-ateena">
            <Link href="/">arrow_left_alt</Link>
          </div>
          <div className="z-10 font-opensauce text-4xl font-normal text-ateena">
            Evästeet
          </div>
        </div>
      </div>
      <div className="p-2">
        Käytämme evästeitä sovelluksen toiminnallisuuden mahdollistamiseksi.
        Emme kerää evästeitä esimerkiksi markkinointitarkoituksiin. Kaikki
        evästeet ovat pakollisia ja hyväksyt ne käyttämällä sovellusta.
        <br />
        <br />
        Jos haluat lukea lisää evästeistä, käyttöehdoista tai
        tietosuojaselosteesta, tutustu tarkemmin{" "}
        <Link className="text-soul underline" href={"/privacy-policy"}>
          tietosuojaselosteeseen
        </Link>{" "}
        ja{" "}
        <Link className="text-soul underline" href={"/terms"}>
          käyttöehtoihin
        </Link>
        .
        <br />
        <br />
        Kiitos, että käytät HuHu-sovellusta!
      </div>
    </>
  )
}
