"use client"
import { useState, useEffect } from "react"
import { fbEditMaxParticipants, getActivities } from "@/firebase"

export default function Home() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getActivities()
      //@ts-ignore
      setActivities(data)
    }

    fetchActivities()
  }, [])

  return (
    <>
      <div className="inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-oslo p-2.5">
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="absolute h-12 w-12"></div>
          <div className="material-symbols-outlined z-10 text-[49px] text-ateena">
            <a href="./">arrow_left_alt</a>
          </div>
          <div className="z-10 font-opensauce text-4xl font-normal text-ateena">
            Ohjelma
          </div>
        </div>
      </div>
      {activities.map((data, index) => {
        return <Activity key={index} data={data}></Activity>
      })}
    </>
  )
}

function Participants(users: string[]) {
  if (!users) return <div></div>
  return (
    <div>
      {users.map((participant: any, index: any) => {
        return (
          <p className="text-xl" key={index}>
            {participant}
          </p>
        )
      })}
    </div>
  )
}

function Activity({ data }: { data: any }) {
  const [showParticipants, setShowParticipants] = useState(false)
  const editMaxParticipants = (id: string) => {
    //@ts-ignore
    const maxParticipants = parseInt(prompt("Anna uusi osallistujamäärä"))
    if (maxParticipants) {
      fbEditMaxParticipants(id, maxParticipants)
      location.reload()
    }
  }
  let usersArray = Object.values(data.participants || {}) as string[]
  return (
    <div className="mt-2.5 flex h-auto w-auto justify-between rounded-2xl bg-oslo p-2">
      <div>
        <div className="ml-1 mt-1 text-xl">{data?.id}</div>
        <div className="ml-1 mt-1 text-xl">
          {"Osallistujia: " + usersArray.length + "/" + data?.maxParticipants}
        </div>
      </div>
      <div>
        <button
          onClick={() => editMaxParticipants(data.id)}
          className="mr-1 mt-1 rounded-xl bg-soul p-1 px-10 text-xl "
        >
          Muokkaa osallistuja määrää
        </button>
        <button
          onClick={() => setShowParticipants(!showParticipants)}
          className="mr-1 mt-1 rounded-xl bg-soul p-1 px-10 text-xl "
        >
          Näytä osallistujat{" "}
        </button>
        {showParticipants && Participants(usersArray)}
      </div>
    </div>
  )
}
