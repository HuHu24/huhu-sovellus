"use client"

import { useState, useEffect } from "react"
import { getAllReleases } from "@/firebase"
import { env } from "@/env"
import Link from "next/link"

const ReleaseTitle = ({ title, id }: { title: string; id: string }) => {
  return <option value={"/releases/" + id}>{title}</option>
}

export default function Home() {
  const [releases, setReleases] = useState<{ id: string; title: string }[]>([])
  useEffect(() => {
    // @ts-ignore
    getAllReleases().then(setReleases).catch(console.error)
  }, [])

  const [data, setData] = useState({
    title: "",
    message: "",
    topic: "",
    page: "/",
  })

  const handleSubmit = async (data: any) => {
    if (data.title.length <= 3 || data.message.length <= 3) {
      alert("Missing or insufficient data")
      return null
    }
    const response = await fetch("/api/admin/messaging", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      console.log("Message sent")
    } else {
      console.error("Error: " + response.statusText)
    }
  }
  const pageMapping: { [key: string]: string } = {
    Etusivu: "/",
    Aikataulu: "/timetable",
    Tiedotteet: "/releases",
    Kartta: "/map",
  }

  const handleOptionChange = (title: string, option: string) => {
    if (title === "page" && !option.startsWith("/")) {
      option = env.NEXT_PUBLIC_URL + pageMapping[option]
    }
    setData((prevValues) => ({ ...prevValues, [title]: option }))
    console.log(data)
  }

  return (
    <>
      <div className="material-symbols-outlined absolute z-10 text-[49px] text-tokio">
        <Link href="./">arrow_left_alt</Link>
      </div>
      <div className="flex h-screen w-full place-content-center place-items-center text-center font-poppins">
        <div className="mx-4 my-auto flex w-full max-w-[500px] flex-col place-items-center gap-3 rounded-[20px] bg-oslo p-4">
          <h1 className="text-2xl font-bold">Uusi ilmoitus</h1>
          <input
            onChange={(event) =>
              handleOptionChange("title", event.target.value)
            }
            className="w-[80%] rounded-lg bg-barcelona p-1 text-xl text-helsinki"
            placeholder="Otsikko..."
          />
          <input
            onChange={(event) =>
              handleOptionChange("message", event.target.value)
            }
            className="w-[80%] rounded-lg bg-barcelona p-1 text-xl text-helsinki"
            placeholder="Sisältö..."
          />{" "}
          <select
            onChange={(event) =>
              handleOptionChange("topic", event.target.value)
            }
            className=" w-[80%] rounded-lg bg-barcelona p-1 text-xl text-helsinki"
          >
            <option>Kohderyhmä</option>
            <option>Kaikki</option>
            <option>komodo</option>
            <option>centralPark</option>
            <option>rio</option>
            <option>bondiBeach</option>
            <option>matera</option>
            <option>aboa</option>
          </select>
          <select
            onChange={(event) => handleOptionChange("page", event.target.value)}
            className=" w-[80%] rounded-lg bg-barcelona p-1 text-xl text-helsinki"
          >
            <option>Valitse toiminto</option>
            <option value={"/"}>Etusivu</option>
            <option value={"/timetable"}>Aikataulu</option>
            <option value={"/releases"}>Tiedotteet</option>
            {releases.map(({ title, id }) => (
              <ReleaseTitle key={id} title={title} id={id} />
            ))}
          </select>
          <button
            onClick={() => {
              if (window.confirm("Vahvista tiedotteen lähetys")) {
                handleSubmit(data)
              }
            }}
            className="h-[70px] w-[80%] rounded-lg bg-soul p-1 px-5 text-xl"
          >
            Lähetä
          </button>
        </div>
      </div>
    </>
  )
}
