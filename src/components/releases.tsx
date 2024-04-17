"use client"
import { useEffect, useState } from "react"
import {getAllReleases, getRelease} from "@/firebase"
import { releaseData } from "@/types/releases"
import Link from "next/link"
import { parse, format } from 'date-fns'

function formatDateTime(date: string, time: string): string {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date())
  const parsedTime = parse(time, 'HH:mm', new Date())

  const dateTime = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate(),
      parsedTime.getHours(),
      parsedTime.getMinutes()
  )

  return format(dateTime, 'dd.MM HH:mm')
}
const HorizontalRelease = ({ id, userSubcamp }: { id: string, userSubcamp: string }) => {
  const [data, setData] = useState<releaseData>()
  useEffect(() => {
    getRelease(id).then((data: any) => {
      const castedData: releaseData = {
        title: data.title,
        releaser: data.releaser,
        time: data.time,
        date: data.date,
        hidden: data.hidden,
        timed: data.timed,
        targetGroup: data.targetGroup,
        subcamp: data.subcamp,
        content: data.content
      }
      setData(castedData)
      console.log(data)
    })
  }, [id])
  console.log(data)


  let displayTime = '';
  if (data) {
    displayTime = formatDateTime(data.date, data.time)
  }
  if (data?.hidden) {
    return null
  }
  if (data?.timed && new Date() < new Date(data.date + 'T' + data.time)) {
    return null
  }
  if (data?.targetGroup == "Alaleiri" && data?.subcamp != userSubcamp) {
    return null
  }
  return (
    <Link href={`/releases/${id}`} className="z-10">
      <div className="mr-4 flex flex-col">
        <div className="flex h-[150px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena">
          <img className="h-full" src="huhuymp.png" alt="" />
        </div>
        <div className="w-[180px] whitespace-normal font-poppins text-xl text-ateena shadow-helsinki text-shadow">
          {data?.title}
        </div>
        <div className="w-[180px] whitespace-normal break-all font-poppins font-normal text-ateena shadow-helsinki text-shadow overflow-hidden line-clamp-2">
          {data?.content}
        </div>
        <div className="w-full overflow-hidden whitespace-normal font-opensauce text-sm font-normal text-ateena shadow-helsinki text-shadow">
          {displayTime}        </div>
      </div>
    </Link>
  )
}

const VerticalRelease = ({ id, userSubcamp }: { id: string, userSubcamp: string }) => {
  const [data, setData] = useState<releaseData>()

  useEffect(() => {
    getRelease(id).then((data: any) => {
      const castedData: releaseData = {
        title: data.title,
        releaser: data.releaser,
        time: data.time,
        date: data.date,
        hidden: data.hidden,
        timed: data.timed,
        targetGroup: data.targetGroup,
        subcamp: data.subcamp,
        content: data.content
      }
      setData(castedData)
    })
  }, [id])
  let displayTime = ''
  if (data) {
    displayTime = formatDateTime(data.date, data.time)
  }
  if (data?.hidden) {
    return null
  }
  if (data?.timed && new Date() < new Date(data.date + 'T' + data.time)) {
    return null
  }
  if (data?.targetGroup == "Alaleiri" && data?.subcamp != userSubcamp) {
    return null
  }

  return (
    <Link href={`/releases/${id}`} className="z-10">
      <div className="flex items-center bg-ateena bg-opacity-0">
        <div className="flex h-[140px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena">
          <img className="h-full" src="huhuymp.png" alt="" />
        </div>
        <div className="ml-[20px] flex w-[150px] flex-col justify-center">
          <div className="text-overflow-ellipsis overflow-hidden whitespace-nowrap font-poppins text-[18px] text-ateena shadow-helsinki text-shadow">
            {data?.title}
          </div>
          <div className="break-all font-opensauce text-[15px] shadow-helsinki text-shadow">
            {displayTime}
            <br />
            {data?.content}
            <br />
          </div>
        </div>
      </div>
    </Link>
  )
}

const Releases = (props: { direction: "vertical" | "horizontal", userSubcamp: string }) => {
  const [releases, setReleases] = useState<{ id: string }[]>([])
  useEffect(() => {
    getAllReleases().then(setReleases).catch(console.error)
  }, [])
  return (
      <>
        {props.direction === "vertical" ? (
            <div className="w-full overflow-y-auto">
              <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {releases.map(({ id }) => (
                    <VerticalRelease key={id} id={id} userSubcamp={props.userSubcamp} />
                ))}
              </div>
            </div>
        ) : (
            <div className="flex overflow-x-auto">
              {releases.map((release) => (
                  <HorizontalRelease key={release.id} id={release.id} userSubcamp={props.userSubcamp} />
              ))}
            </div>
        )}
      </>
  )
}

export default Releases
