"use client"

import Releases from "@/components/releases"
import DaysTimetable from "@/components/daysTimetable"
import { useEffect, useState } from "react"
import { getApp } from "firebase/app"
import {
  fetchAndActivate,
  getRemoteConfig,
  getString,
} from "firebase/remote-config"
import { env } from "@/env"
import { TimetableProps } from "@/app/timetable/page"

export default function Home() {
  const [subcamp, setSubcamp] = useState<string>("")
  const [timetable, setTimetable] = useState<TimetableProps>()

  useEffect(() => {
    const app = getApp()
    const remoteConfig = getRemoteConfig(app)
    remoteConfig.settings.minimumFetchIntervalMillis = 30000

    let keyword: String = "Subcamp"
    fetch(`${env.NEXT_PUBLIC_URL}/api/auth`)
      .then((res) => {
        res.text().then((data) => {
          const parsedData = JSON.parse(data)
          if (parsedData.email && parsedData.email != "") keyword = "Admin"
          else keyword += parsedData.claims.subcamp
          setSubcamp(parsedData.claims.subcamp)
        })
      })
      .then(() => {
        fetchAndActivate(remoteConfig)
          .then(() => {
            const timetableData = JSON.parse(
              getString(remoteConfig, `timetable${keyword}`)
            )
            setTimetable(timetableData)
          })
          .catch((err) => {
            setTimetable(undefined)
          })
      })
  }, [])

  return (
    <div className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-helsinki">
      <div className="flex w-full flex-col gap-4 p-4">
        <Releases direction={"horizontal"} userSubcamp={subcamp} />
        <>
          {timetable ? (
            <DaysTimetable
              date={timetable.days[0].date}
              events={timetable.days[0].events}
            />
          ) : (
            <DaysTimetable date="Ei aikataulua" events={[]} />
          )}
        </>
      </div>
      <div className="m-4 rounded-xl bg-oslo p-2">
        <h1 className="text-2xl font-bold">Turvallisuuden pikaohje</h1>
        <p>
          Jos sinuun sattuu fyysisesti, soita EA-päivystyspuhelimeen (041 727
          1075).
        </p>
        <br />
        <p>
          Jos sinuun sattuu henkisesti, soita, txt tai laita Whatsappia Henkisen
          turvan päivystyspuhelimeen (041 727 1074).
        </p>
        <br />
        <p>
          Jos kumpikaan näistä ei vastaa tilannettasi, mutta tarvitset muuta
          apua tai yhteyden Turvallisuuteen, soita Turvan päivystyspuhelimeen
          (041 727 8125).
        </p>
        <br />
        <p className="font-bold">
          Akuuteissa hätätilanteissa, soita 112. Jonka jälkeen soita
          välittömästi Turvan päivystyspuhelimeen (041 727 8125).
        </p>
        <br />
      </div>
    </div>
  )
}
