"use client"
import { useEffect, useState } from "react"
import { getAllReleases, getRelease } from "@/firebase"
import { releaseData } from "@/types/releases"
import Link from "next/link"

export const Release = ({ id }: { id: string }) => {
  const [data, setData] = useState<releaseData>()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getRelease(id).then((data: any) => {
      const castedData: releaseData = {
        title: data.title,
        releaser: data.releaser,
        time: data.time,
        importance: data.importance,
      }
      setData(castedData)
    })
  }, [id])

  const deleteRelease = async (id: string) => {
    await fetch(`/api/releases/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
  }

  return (
    <div className="z-10">
      <div className="flex items-center bg-ateena bg-opacity-0">
        <Link
          href={`./releases/${id}`}
          className="flex h-[140px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena"
        >
          <img className="h-full" src="huhuymp.png" alt="" />
        </Link>
        <div className="ml-1 flex w-[200px] flex-col justify-center">
          <div className="text-overflow-ellipsis overflow-hidden whitespace-nowrap break-all font-poppins text-[18px] text-ateena shadow-helsinki text-shadow">
            {data?.title}
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="break-all font-opensauce text-[15px] shadow-helsinki text-shadow"
          >
            {"julkaistu: " + data?.time}
            <br />
            {"julkaisija: " + data?.releaser}
            <br />
            {"kriittisyys: " + data?.importance}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="material-symbols-outlined z-20 mt-1 flex justify-between text-[49px] text-tokio"
          >
            <a>visibility_lock</a>
            <a>keyboard_arrow_down</a>
          </button>
        </div>
      </div>
      {isOpen ? (
        <div
          className="relative z-10 flex h-[50px] w-full rounded-[10px] bg-soul"
          style={{ justifyContent: "space-between" }}
        >
          <div className="flex" style={{ justifyContent: "space-between" }}>
            <Link
              href={`/releases/${id}`}
              className="material-symbols-outlined text-[50px] text-ateena"
            >
              visibility
            </Link>
            <p className="-mt-1.5 ml-2 font-opensauce text-[40px]">200</p>
          </div>
          <div>
            <Link
              href={`./notifications/${id}`}
              className="material-symbols-outlined text-[50px] text-ateena"
            >
              notifications_active
            </Link>
            <Link
              href={`./releases/${id}`}
              className="material-symbols-outlined mr-2 text-[50px] text-ateena"
            >
              edit
            </Link>
            <button
              onClick={() => deleteRelease(id)}
              className="material-symbols-outlined mr-2 text-[50px] text-ateena"
            >
              delete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const Releases = () => {
  const [releases, setReleases] = useState<{ id: string }[]>([])
  useEffect(() => {
    const fetchReleases = async () => {
      const allReleases = await getAllReleases()
      setReleases(allReleases)
    }

    fetchReleases().catch(console.error)
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
