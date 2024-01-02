import Head from "next/head"

import Navbar from "./components/navbar/navbar"

export default function Home() {


  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Head>
        <title>Huhu Leirisovellus</title>
      </Head>
      <main className="relative bg-helsinki w-full h-full overflow-hidden flex flex-col items-start justify-start box-border text-left text-[28px] text-palevioletred font-poppins">
         
      
      <Navbar></Navbar>

      </main>
    </div>
  )
}
