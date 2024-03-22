"use client"
import Link from "next/link"
import { getRelease } from "@/firebase"
import { useEffect, useState } from "react"
interface DataType {
  title: string
  releaser: string
  time: string
  importance: string
}

export const Release = ({ id }: { id: string }) => {
  const [data, setData] = useState<DataType>()
  useEffect(() => {
    getRelease(id).then((data: any) => {
      const castedData: DataType = {
        title: data.title,
        releaser: data.releaser,
        time: data.time,
        importance: data.importance,
      }
      setData(castedData)
    })
  }, [])
  console.log(data)
  return (
    <Link href={`/releases/${id}`} className="z-10">
      <div className="flex items-center bg-ateena bg-opacity-0">
        <div className="flex h-[140px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena">
          <img className="h-full" src="huhuymp.png" alt="" />
        </div>
        <div className="ml-[20px] flex w-[150px] flex-col justify-center">
          <div className="text-overflow-ellipsis overflow-hidden whitespace-nowrap break-all font-poppins text-[18px] text-ateena shadow-helsinki text-shadow">
            {data?.title}
          </div>
          <div className="break-all font-opensauce text-[15px] shadow-helsinki text-shadow">
            {data?.time}
            <br />
            {data?.releaser}
            <br />
            {data?.importance}
          </div>
        </div>
      </div>
    </Link>
  )
}
export default Release
