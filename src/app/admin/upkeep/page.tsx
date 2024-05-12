"use client"

import { useEffect, useState } from "react"
import Flaw from "@/types/flaw"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"

const Upkeep = () => {
  const [flaws, setFlaws] = useState<Flaw[]>([])

  useEffect(() => {
    getDocs(collection(db, "flaws"))
      .then((data) => {
        let formattedData: Flaw[] = []
        data.forEach((doc) => {
          const docData = doc.data()
          formattedData.push({
            id: doc.id,
            createdAt: docData.createdAt.toDate(),
            text: docData.text,
          })
        })

        formattedData.sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        )

        setFlaws(formattedData)
      })
      .catch((error) => {
        console.error("Error getting documents: ", error)
      })
  }, [])

  const markFlawCompleted = async (id: string) => {
    try {
      await deleteDoc(doc(collection(db, "flaws"), id))
      setFlaws(flaws.filter((flaw) => flaw.id !== id))
    } catch (error) {
      console.error("Error removing document: ", error)
      alert("Ongelmia puutteen merkkaamisessa korjatuksi. Yritä uudelleen.")
    }
  }

  return (
    <>
      <div className="inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-oslo p-2.5">
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="absolute h-12 w-12"></div>
          <div className="material-symbols-outlined z-10 text-[49px] text-ateena">
            <a href="./">arrow_left_alt</a>
          </div>
          <div className="z-10 font-opensauce text-4xl font-normal text-ateena">
            Puutteet
          </div>
        </div>
      </div>
      <div className="p-3">
        {flaws.map((flaw, key) => {
          return (
            <div key={key} className="m-3 rounded-xl bg-oslo p-2">
              <h1 className="text-2xl font-bold">
                {Intl.DateTimeFormat("fi-FI", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }).format(flaw.createdAt)}
              </h1>
              <p className="text-lg">{flaw.text}</p>
              <button
                onClick={() => markFlawCompleted(flaw.id)}
                className="mt-2 rounded-lg bg-soul p-1 px-5 text-xl"
              >
                Merkkaa puute suoritetuksi
              </button>
            </div>
          )
        })}
      </div>
      <p>
        <br />
        <br />
        <br />
      </p>
    </>
  )
}

export default Upkeep
