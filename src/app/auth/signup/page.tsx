"use client"

import { useState } from "react"
import { signUpWithEmailAndPassword } from "@/firebase"
import Link from "next/link"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <h1 className="text-2xl font-bold">Luo käyttäjä</h1>
      <input
        onChange={(event) => setEmail(event.target.value)}
        className="max-w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki"
        type="email"
        placeholder="Sähköposti..."
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        className="max-w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki"
        type="password"
        placeholder="Salasana..."
      />
      <button
        onClick={() => signUpWithEmailAndPassword(email, password)}
        className="rounded-lg bg-soul p-1 px-5 text-xl"
      >
        Luo käyttäjä
      </button>
      <Link
        href="/auth/signin"
        className="text-sm text-soul underline hover:text-ateena"
      >
        Kirjaudu käyttäjän luomisen sijasta
      </Link>
    </>
  )
}
