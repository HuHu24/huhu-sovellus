"use client"
import { useState } from 'react';
import Link from "next/link"

const Release_fullscreen = () => {
    const [lightMode, setLightMode] = useState(false);

    const toggleLightMode = () => {
        setLightMode(!lightMode);
    }

    
    return (
        <div className={`w-screen h-screen ${lightMode ? 'bg-ateena' : 'bg-helsinki'} overflow-x-hidden overflow-y-auto mb-4`}>
            <div
                className={`h-1/4 w-full bg-ateena align-top flex justify-center items-center`}>
                <img src="huhuymp.png" className="h-full align-middle" alt=""/>
                <Link href={"/"} className="z-10">
                    <div
                        className="fixed top-0 left-0 text-shadow shadow-buenos_aires material-symbols-outlined text-[49px] text-buenos_aires">
                        arrow_left_alt
                    </div>
                </Link>
            </div>
            <div className={`h-full w-full ml-6 relative ${lightMode ? 'text-helsinki' : 'text-ateena'}`}>
                <div className="w-screen mt-3">
                    <div className="flex justify-between">
                        <div className="whitespace-normal text-5xl font-poppins grid"> Jaahas </div>
                        <button onClick={toggleLightMode} className={`material-symbols-outlined text-5xl mr-8 ${lightMode ? 'text-helsinki' : 'text-ateena'}`}>
                            {lightMode ? 'dark_mode' : 'light_mode'}
                        </button>
                    </div>
                    <div
                        className="whitespace-normal text-2xl font-poppins mt-4 ml-0 "> 1.11.1111
                        22:22
                    </div>
                    <div
                        className="whitespace-normal text-2xl font-poppins ml-0"> Julkaisija:
                        Chatgpt..
                    </div>
                </div>
                <div className="text-xl break-words mr-10 overflow-auto mt-2.5">
                    Moro kaikki!
                    Joudumme vähän pettämään teidän odotuksia – meidän suunnitellut herkkutreffit joudutaan siirtämään. Pahoittelut tästä, mutta meillä on ollut muutama logistinen sotku, ja keittiöväki on vähän pulassa.
                    Tässä pikainen debrief:
                    Toimitusseikkailut: Kaikki tilaukset eivät saapuneet, ja ne, jotka saapuivat, näyttivät siltä kuin ne olisivat kierrelleet maailmaa ennen perille pääsyään.
                    Henkilökunta puuttuu: Jotkut kokit päättivät ottaa vapaapäivän samaan aikaan, joten meillä on enemmän keittiöhaasteita kuin voimme sanoa &quot;keittiö&quot;.
                    Yritetään paikata hommaa ja järkätä teille jotain parempaa. Pysykää kuulolla ja pysykää nälkäisinä!
                    Kysymyksiä? Ota yhteyttä meihin. Olemme täällä sinua varten.
                    <p>Kuva: Screenshot brandikirjasta</p>
                </div>
            </div>
        </div>
    )
}

export default Release_fullscreen;