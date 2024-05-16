"use client"

import { useState } from "react"
import { addDoc, Timestamp } from "@firebase/firestore"
import { collection } from "firebase/firestore"
import { db } from "@/firebase"

const ReportToUpkeep = () => {
  const [text, setText] = useState("")

  const handleSend = async () => {
    try {
      if (text === "") {
        alert(
          "Et voi raportoida tyhjää puutetta. Kerro puutteesta ja sitten voit raportoida sen."
        )
        return
      }

      await addDoc(collection(db, "flaws"), {
        createdAt: new Date(),
        text: text,
      })

      setText("")

      alert("Puute ilmoitettu huollolle. Kiitos paljon!")
    } catch (e) {
      console.error(e)
      alert("Ongelmia puutetta raportoidessa. Yritä uudelleen")
    }
  }

  return (
    <div className="m-3 rounded-xl bg-oslo p-2">
      <h1 className="text-2xl font-bold">Ilmoita puutteesta Huollolle</h1>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="my-3 w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki"
        placeholder="Kerro minkälainen puute on kyseessä ja missä puute sijaitsee..."
      />
      <div className="flex w-full place-content-center">
        <button
          onClick={handleSend}
          className="rounded-lg bg-soul p-1 px-5 text-xl"
        >
          Ilmoita puutteesta
        </button>
      </div>
    </div>
  )
}

export default ReportToUpkeep
