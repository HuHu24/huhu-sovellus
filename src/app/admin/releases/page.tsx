import Releases from "@/components/admin/releases/releases"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative h-full w-screen overflow-hidden bg-helsinki">
      <div className="bg-white inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-opacity-0 p-2.5">
        <div className="bg-white inline-flex items-center justify-between self-stretch bg-opacity-0">
          <div className="absolute h-12 w-12"></div>
          <div className="material-symbols-outlined z-10 text-[49px] text-tokio">
            <Link href="./">arrow_left_alt</Link>
          </div>
          <div className="z-10 font-opensauce text-4xl text-tokio ">
            Tiedotteet
          </div>
          <div className="material-symbols-outlined z-10 text-[49px] text-tokio">
            <Link href="./releases/new">add_circle</Link>
          </div>
        </div>
      </div>
      <div className="z-30 w-full gap-4 p-3">
        <div className="flex h-screen overflow-y-scroll">
          <Releases></Releases>
        </div>
      </div>
    </div>
  )
}
