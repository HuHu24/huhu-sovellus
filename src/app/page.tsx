"use client"
import Head from "next/head"

import Navbar from "../components/navbar/navbar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <Head>
        <title>Huhu Leirisovellus</title>
      </Head>
      <main className="text-palevioletred relative box-border flex h-full w-full flex-col items-start justify-start overflow-hidden bg-helsinki text-left font-poppins text-[28px]"></main>
    </div>
  )
}
