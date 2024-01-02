import Head from "next/head"

import { metadata } from "./layout"
import Navbar from "./components/navbar/navbar"

export default function Home() {
  let title = metadata.title

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="relative bg-helsinki w-full h-full overflow-hidden flex flex-col items-start justify-start box-border text-left text-[28px] text-palevioletred font-poppins">
         
      
      <Navbar></Navbar>

      </main>
    </div>
  )
}
