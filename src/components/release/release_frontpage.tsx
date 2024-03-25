"use client"
import Link from "next/link"
import { getAllReleases, getRelease } from "@/firebase"
import { useEffect, useState } from "react"
import { releaseData } from "@/types/releases"

const Release = ({ id }: { id: string }) => {
  const [data, setData] = useState<releaseData>()
  useEffect(() => {
    getRelease(id).then((data: any) => {
      const castedData: releaseData = {
        title: data.title,
        releaser: data.releaser,
        time: data.time,
        importance: data.importance,
      }
      setData(castedData)
      console.log(data)
    })
  }, [id])
  console.log(data)
  return (
    <Link href={`/releases/${id}`} className="z-10">
      <div className="mr-4 flex flex-col">
        <div className="flex h-[150px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena">
          <img className="h-full" src="huhuymp.png" alt="" />
        </div>
        <div className="w-[180px] whitespace-normal font-poppins font-normal text-ateena shadow-helsinki text-shadow">
          {data?.title}
        </div>
        <div className="w-[180px] whitespace-normal font-poppins font-normal text-ateena shadow-helsinki text-shadow">
          {data?.releaser}
        </div>
        <div className="w-full overflow-hidden whitespace-normal font-opensauce text-sm font-normal text-ateena shadow-helsinki text-shadow">
          {data?.time}
        </div>
      </div>
    </Link>
  )
}

const Releases = () => {
  const [releases, setReleases] = useState<{ id: string }[]>([])
  useEffect(() => {
    const fetchReleases = async () => {
      const allReleases = await getAllReleases()
      setReleases(allReleases)
    }

    fetchReleases()
  }, [])

  return (
    <div className="flex overflow-x-auto">
      {releases.map((release) => (
        <Release key={release.id} id={release.id} />
      ))}
    </div>
  )
}

export default Releases
