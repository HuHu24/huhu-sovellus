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
    const [subcamp,setSubcamp] = useState<string>("")
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
      <div className="absolute -right-40 -top-40 p-2.5">
        <div className="inline-flex h-[369px] w-[360px] items-end justify-start gap-2.5">
          <div className="shrink grow basis-0 self-stretch rounded-full bg-barcelona" />
        </div>
      </div>
      <div className="fixed -bottom-40 -left-44 p-2.5 ">
        <div className="inline-flex h-[341px] w-[341px] flex-col items-end justify-start gap-2.5">
          <div className="shrink grow basis-0 self-stretch rounded-full bg-soul" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 p-3">
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
    </div>
  )
}
