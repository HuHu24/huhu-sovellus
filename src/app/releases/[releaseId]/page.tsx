"use client"

import React, { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getRelease } from "@/firebase"
type DataType = {
  title: string
  time: string
  releaser: string
  content: string
  releaseId: string
  image: string
}

export default function Home() {
  const router = useRouter()
  const [lightMode, setLightMode] = useState(false)
  const releaseId = usePathname().split("/").pop()
  // Explicitly define the type for data
  const [data, setData] = useState<DataType | null>(null)
  useEffect(() => {
    const fetchReleaseData = async () => {
      if (releaseId) {
        const releaseData: any = await getRelease(releaseId)
        const castedData: DataType = {
          title: releaseData.title,
          time: releaseData.time,
          releaser: releaseData.releaser,
          content: releaseData.content,
          releaseId: releaseData.releaseId,
          image: releaseData.image,
        }
        setData(castedData)
      }
    }

    fetchReleaseData().catch(console.error)
  }, [])
  const toggleLightMode = () => {
    setLightMode(!lightMode)
  }
  return (
    <div
      className={`h-screen w-screen ${
        lightMode ? "bg-ateena" : "bg-helsinki"
      } mb-4 overflow-y-auto overflow-x-hidden`}
    >
      <div
        className={`relative flex items-center justify-center bg-ateena align-top`}
      >
        <img
          src={data?.image}
          className="rounded-m h-[30vh] w-full object-cover"
          alt=""
        />

        <button
          onClick={() => router.back()}
          className="absolute left-0 top-0 z-10"
        >
          <div className="material-symbols-outlined text-[49px] text-buenos_aires shadow-buenos_aires text-shadow">
            arrow_left_alt
          </div>
        </button>
      </div>

      <div
        className={`relative ml-6 h-full w-full ${
          lightMode ? "text-helsinki" : "text-ateena"
        }`}
      >
        <div className="mt-3 w-screen">
          <div className="flex justify-between">
            <div className="grid whitespace-normal font-poppins text-5xl">
              {data?.title}
            </div>
            <button
              onClick={toggleLightMode}
              className={`material-symbols-outlined mr-8 text-5xl ${
                lightMode ? "text-helsinki" : "text-ateena"
              }`}
            >
              {lightMode ? "dark_mode" : "light_mode"}
            </button>
          </div>
          <div className="ml-0 mt-4 whitespace-normal font-poppins text-2xl ">
            {data?.time}
          </div>
          <div className="ml-0 whitespace-normal font-poppins text-2xl">
            {data?.releaser}
          </div>
        </div>
        <div className="mr-10 mt-2.5 overflow-auto break-words text-xl">
          {data?.content}
        </div>
      </div>
    </div>
  )
}
