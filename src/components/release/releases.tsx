"use client"
import { useEffect, useState } from "react"
import { getAllReleases } from "@/firebase"
import { Release } from "@/components/release/release"
const Releases = () => {
  const [releases, setReleases] = useState<{ id: string }[]>([])
  useEffect(() => {
    getAllReleases().then(setReleases).catch(console.error)
  }, [])

  return (
    <div className="w-full overflow-y-auto">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {releases.map(({ id }) => (
          <Release key={id} id={id} />
        ))}
      </div>
    </div>
  )
}

export default Releases
