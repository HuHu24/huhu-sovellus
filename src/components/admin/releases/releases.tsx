"use client"
import { useEffect, useState } from "react"
import { getAllReleases, getRelease } from "@/firebase"
import { Release as ReleaseType } from "@/types/releases"
import Link from "next/link"
import { format, parse } from "date-fns"

function formatDateTime(date: string, time: string): string {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date())
  const parsedTime = parse(time, "HH:mm", new Date())

  const dateTime = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
    parsedTime.getHours(),
    parsedTime.getMinutes()
  )

  return format(dateTime, "dd.MM HH:mm")
}

export const Release = ({ id }: { id: string }) => {
  const [data, setData] = useState<ReleaseType>()
  useEffect(() => {
    getRelease(id).then((data: any) => {
      const castedData: ReleaseType = {
        id: id,
        title: data.title,
        releaser: data.releaser,
        time: data.time,
        date: data.date,
        hidden: data.hidden,
        timed: data.timed,
        targetGroup: data.targetGroup,
        subcamp: data.subcamp,
        content: data.content,
        image: data.image,
      }
      setData(castedData)
    })
  }, [id])
  let displayTime = ""
  if (data) {
    displayTime = formatDateTime(data?.date, data?.time)
  }

  return (
    <div className="z-10">
      <div className="flex items-center bg-ateena bg-opacity-0">
        <Link
          href={`./releases/${id}`}
          className="flex h-[140px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena"
        >
          <img className="h-full" src={data?.image} alt="" />
        </Link>
        <div className="ml-1 flex w-[200px] flex-col justify-center">
          <div className="text-overflow-ellipsis overflow-hidden whitespace-nowrap break-all font-poppins text-[18px] text-ateena shadow-helsinki text-shadow">
            {data?.title}
          </div>
          <div className="break-all font-opensauce text-[15px] shadow-helsinki text-shadow">
            {"julkaistu: " + displayTime}
            <br />
            {"julkaisija: " + data?.releaser}
            <br />
            {"Piilotettu: " + data?.hidden}
            <br />
            {"Ajastettu: " + data?.timed}
            <br />
            {"Kohde alaleiri: " + data?.subcamp}
          </div>
        </div>
      </div>
    </div>
  )
}

const Releases = () => {
  const [releases, setReleases] = useState<{ id: string }[]>([])
  useEffect(() => {
    getAllReleases()
      .then((releases) => {
        // @ts-ignore
        releases.sort((a, b) => b.timestamp - a.timestamp)
        if (!releases) return []
        setReleases(releases)
      })
      .catch(console.error)
  }, [])

  return (
    <div className="w-full overflow-y-auto">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {releases.map((release) => (
          <Release key={release.id} id={release.id} />
        ))}
      </div>
    </div>
  )
}

export default Releases
