"use client"
import DaysTimetable from "@/components/daysTimetable"
import { env } from "@/env"
import { getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {
  fetchAndActivate,
  getRemoteConfig,
  getString,
} from "firebase/remote-config"
import { useEffect, useState } from "react"

interface TimetableProps {
  days: {
    date: string
    events: {
      time: string
      title: string
      description: string
    }[]
  }[]
}

export default function Home() {
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
    <div className="relative h-full w-full overflow-hidden bg-helsinki">
      <div className="bg-white inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-opacity-0 p-2.5">
        <div className="bg-white inline-flex items-center justify-between self-stretch bg-opacity-0">
          <div className="absolute h-12 w-12"></div>
          <div className="material-symbols-outlined z-10 text-[49px] text-helsinki">
            <a href="./">arrow_left_alt</a>
          </div>
          <div className="z-10 font-opensauce text-4xl font-normal text-tokio ">
            Aikataulu
          </div>
        </div>
      </div>
      <div className="absolute -left-44 -top-44 z-0 p-2.5">
        <div className="z-0 inline-flex h-[369px] w-[360px] items-end justify-start gap-2.5">
          <div className="z-0 shrink grow basis-0 self-stretch rounded-full bg-buenos_aires" />
        </div>
      </div>
      <div className="absolute -bottom-48 -right-48 p-2.5 ">
        <div className="inline-flex h-[341px] w-[341px] flex-col items-end justify-start gap-2.5">
          <div className="shrink grow basis-0 self-stretch rounded-full bg-barcelona" />
        </div>
      </div>
      <div className=" z-20 -mt-3 flex h-full w-full flex-col gap-4 overflow-auto p-3">
        {timetable ? (
          timetable.days.map((day, key) => (
            <DaysTimetable key={key} date={day.date} events={day.events} />
          ))
        ) : (
          <DaysTimetable date="Ei aikataulua" events={[]} />
        )}
      </div>
    </div>
  )
}
