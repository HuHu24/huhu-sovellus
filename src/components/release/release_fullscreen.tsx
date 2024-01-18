"use client"
import { useState } from "react"
import Link from "next/link"

const Release_fullscreen = () => {
  const [lightMode, setLightMode] = useState(false)

  const toggleLightMode = () => {
    setLightMode(!lightMode)
  }

  return (
    <div
      className={`h-screen w-screen ${
        lightMode ? "bg-ateena" : "bg-helsinki"
      } mb-4 overflow-y-auto overflow-x-hidden`}
    >
      <div
        className={`flex h-1/4 w-full items-center justify-center bg-ateena align-top`}
      >
        <img src="huhuymp.png" className="h-full align-middle" alt="" />
        <Link href={"/"} className="z-10">
          <div className="material-symbols-outlined fixed left-0 top-0 text-[49px] text-buenos_aires shadow-buenos_aires text-shadow">
            arrow_left_alt
          </div>
        </Link>
      </div>
      <div
        className={`relative ml-6 h-full w-full ${
          lightMode ? "text-helsinki" : "text-ateena"
        }`}
      >
        <div className="mt-3 w-screen">
          <div className="flex justify-between">
            <div className="grid whitespace-normal font-poppins text-5xl">
              {" "}
              Jaahas{" "}
            </div>
            <button
              onClick={toggleLightMode}
              className={`material-symbols-outlined mr-8 text-5xl ${
                lightMode ? "text-helsinki" : "text-ateena"
              }`}
            >
              {lightMode ? "dark_mode" : "light_mode"}
            </button>
          </div>
          <div className="ml-0 mt-4 whitespace-normal font-poppins text-2xl ">
            {" "}
            1.11.1111 22:22
          </div>
          <div className="ml-0 whitespace-normal font-poppins text-2xl">
            {" "}
            Julkaisija: Chatgpt..
          </div>
        </div>
        <div className="mr-10 mt-2.5 overflow-auto break-words text-xl">
          Moro kaikki! Joudumme vähän pettämään teidän odotuksia – meidän
          suunnitellut herkkutreffit joudutaan siirtämään. Pahoittelut tästä,
          mutta meillä on ollut muutama logistinen sotku, ja keittiöväki on
          vähän pulassa. Tässä pikainen debrief: Toimitusseikkailut: Kaikki
          tilaukset eivät saapuneet, ja ne, jotka saapuivat, näyttivät siltä
          kuin ne olisivat kierrelleet maailmaa ennen perille pääsyään.
          Henkilökunta puuttuu: Jotkut kokit päättivät ottaa vapaapäivän samaan
          aikaan, joten meillä on enemmän keittiöhaasteita kuin voimme sanoa
          &quot;keittiö&quot;. Yritetään paikata hommaa ja järkätä teille jotain
          parempaa. Pysykää kuulolla ja pysykää nälkäisinä! Kysymyksiä? Ota
          yhteyttä meihin. Olemme täällä sinua varten.
          <p>Kuva: Screenshot brandikirjasta</p>
        </div>
      </div>
    </div>
  )
}

export default Release_fullscreen
