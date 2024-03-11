"use client"

import { FormEventHandler, useEffect, useRef, useState } from "react"

export default function Home() {
  const [message, setMessage] = useState("")
  const chatContainerRef = useRef<any>()

  useEffect(() => {
    // Scroll to the bottom on component mount
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [])

  const handleSendMessage = (event: any) => {
    event.preventDefault()
    // Handle sending the message logic here

    // Scroll to the bottom after sending a message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }

    // Clear the message input
    setMessage("")
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-helsinki">
      <div className="bg-white inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-opacity-0 p-2.5">
        <div className="bg-white inline-flex items-center justify-between self-stretch bg-opacity-0">
          <div className="absolute h-12 w-12"></div>
          <div className="material-symbols-outlined z-10 text-[49px] text-ateena">
            <a href="./">arrow_left_alt</a>
          </div>
          <div className="z-10 font-opensauce text-4xl font-normal text-tokio ">
            Turvachat
          </div>
        </div>
      </div>
      <div
        ref={chatContainerRef}
        className="flex h-full w-full flex-col gap-4 overflow-auto p-3"
      >
        <div className="flex w-full">
          <div className="break-all rounded-lg bg-barcelona p-2 text-lg text-helsinki">
            Hei! Kuinka voin auttaa sinua tänään?
          </div>
          <div className="w-2/4"></div>
        </div>
        <div className="flex w-full">
          <div className="w-2/4"></div>
          <div className="ml-auto break-all rounded-lg bg-buenos_aires p-2 text-lg text-helsinki">
            Minulla on ongelma tietokoneeni kanssa. Se ei käynnisty oikein.
          </div>
        </div>
        <div className="flex w-full">
          <div className="break-all rounded-lg bg-barcelona p-2 text-lg text-helsinki">
            Voi ei, se kuulostaa harmittavalta. Mitä tarkalleen ottaen tapahtuu,
            kun yrität käynnistää tietokonetta?
          </div>
          <div className="w-2/4"></div>
        </div>
        <div className="flex w-full">
          <div className="w-2/4"></div>
          <div className="ml-auto break-all rounded-lg bg-buenos_aires p-2 text-lg text-helsinki">
            Tietokone näyttää vain mustaa ruutua eikä reagoi mihinkään.
          </div>
        </div>
        <div className="flex w-full">
          <div className="break-all rounded-lg bg-barcelona p-2 text-lg text-helsinki">
            Ymmärrän. Ensimmäisenä voit kokeilla sammuttaa tietokoneen kokonaan
            ja käynnistää sen uudelleen. Jos se ei auta, voimme tarkastella
            muita mahdollisia syitä. Onko sinulla varmuuskopiota tärkeistä
            tiedostoista?
          </div>
          <div className="w-2/4"></div>
        </div>
        <div className="flex w-full">
          <div className="w-2/4"></div>
          <div className="ml-auto break-all rounded-lg bg-buenos_aires p-2 text-lg text-helsinki">
            En ole tehnyt varmuuskopiota pitkään aikaan.
          </div>
        </div>
        <div className="flex w-full">
          <div className="break-all rounded-lg bg-barcelona p-2 text-lg text-helsinki">
            Ei hätää, yritetään ensin ratkaista käynnistysongelma ja sitten
            voimme keskustella varmuuskopioinnista. Kokeile ensin
            uudelleenkäynnistystä ja kerro, mitä tapahtuu.
          </div>
          <div className="w-2/4"></div>
        </div>
        <div className="flex w-full">
          <div className="w-2/4"></div>
          <div className="ml-auto break-all rounded-lg bg-buenos_aires p-2 text-lg text-helsinki">
            Ok, odota hetki.
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-2/4"></div>
          <div className="ml-auto break-all rounded-lg bg-buenos_aires p-2 text-lg text-helsinki">
            Valitettavasti se ei auttanut. Musta ruutu on edelleen.
          </div>
        </div>
        <div className="flex w-full">
          <div className="break-all rounded-lg bg-barcelona p-2 text-lg text-helsinki">
            Selvä. Tässä vaiheessa voit yrittää käynnistää tietokoneen
            vikasietotilassa. Yleensä se onnistuu painamalla F8-näppäintä
            käynnistyksen aikana. Kokeile sitä ja kerro, mitä tapahtuu.
          </div>
          <div className="w-2/4"></div>
        </div>
        <div className="flex w-full">
          <div className="w-2/4"></div>
          <div className="ml-auto break-all rounded-lg bg-buenos_aires p-2 text-lg text-helsinki">
            Hyvä idea, kokeilen heti.
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-2/4"></div>
          <div className="ml-auto break-all rounded-lg bg-buenos_aires p-2 text-lg text-helsinki">
            Wau, se toimi! Nyt olen vikasietotilassa.
          </div>
        </div>
        <div className="flex w-full">
          <div className="ml-auto break-all rounded-lg bg-barcelona p-2 text-lg text-helsinki">
            Hienoa kuulla! Se saattaa viitata siihen, että jokin
            käynnistysohjelma tai ajuri aiheuttaa ongelman. Voimme jatkaa
            vianetsintää ja selvittää, mikä tarkalleen ottaen aiheuttaa
            ongelman. Onko sinulla tietoturvapäivityksiä tai
            ohjelmistopäivityksiä, joita et ole asentanut viime aikoina?
          </div>
          <div className="w-2/4"></div>
        </div>
        <div>
          <br />
          <br />
          <br />
        </div>
      </div>
      <div className="fixed bottom-0 z-30 box-border flex h-[90px] w-screen bg-gray">
        <form
          className="flex h-full w-full place-items-center gap-5 p-3"
          onSubmit={handleSendMessage}
        >
          <textarea
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            className="h-full w-full rounded-lg bg-barcelona p-2 text-xl text-helsinki"
            placeholder="Kirjoita viesti..."
            required={true}
          />
          <button>
            <span className="material-symbols-outlined h-[48px] w-full cursor-pointer text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]">
              send
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}
