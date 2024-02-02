"use client"

import React, {useEffect, useState} from "react";
import {onAuthStateChanged} from "@firebase/auth";
import {auth, db} from "@/firebase";
import {doc, getDoc} from "@firebase/firestore";
import AccessList from "@/app/admin/access/accessList";



export default function Access() {
  const [admins, setAdmins] = useState<[{ email: string, uid: string }] | []>([])
  const [subcamp, setSubcamp] = useState<[{ email: string, uid: string }] | []>([])
  const [safety, setSatefy] = useState<[{ email: string, uid: string }] | []>([])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const result = await getDoc(doc(db, "/claims/claims"))

        const data = result.data() as {admins: [{ email: string, uid: string }], safety: [{ email: string, uid: string }], subcamp: [{ email: string, uid: string }]}
        setAdmins(data.admins)
        setSubcamp(data.subcamp)
        setSatefy(data.safety)
      }
    })
  }, [])

  return <>
    <div className="relative h-full w-full overflow-hidden bg-helsinki">
      <div
        className="bg-white inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-opacity-0 p-2.5">
        <div className="bg-white inline-flex items-center justify-between self-stretch bg-opacity-0">
          <div className="material-symbols-outlined z-10 text-[49px] text-helsinki">
            <a href="./">arrow_left_alt</a>
          </div>
          <h1 className="z-10 font-opensauce text-4xl font-normal text-tokio ">
            Oikeuksien hallinta
          </h1>
        </div>
      </div>
      <div className="absolute -left-72 -top-60 z-0 p-2.5">
        <div className="z-0 inline-flex h-[369px] w-[360px] items-end justify-start gap-2.5">
          <div className="z-0 shrink grow basis-0 self-stretch rounded-full bg-buenos_aires"/>
        </div>
      </div>
      <div className="absolute -bottom-48 -right-48 p-2.5 ">
        <div className="inline-flex h-[341px] w-[341px] flex-col items-end justify-start gap-2.5">
          <div className="shrink grow basis-0 self-stretch rounded-full bg-barcelona"/>
        </div>
      </div>
      <div className="z-20 -mt-3 flex place-items-center h-full w-full flex-col gap-4 overflow-auto p-3">
        <div className="z-20 flex w-full max-w-[500px] flex-col place-items-center gap-3 rounded-[20px] bg-oslo p-4">
          <h2 className="text-2xl font-bold">Anna oikeus</h2>
          <input
            className="w-full max-w-[400px] rounded-lg bg-barcelona p-1 text-xl text-helsinki"
            type="email"
            placeholder="Sähköposti..."
          />
          <select className="w-full max-w-[400px] rounded-lg bg-barcelona p-1 text-xl text-helsinki">
            <option value="">---Valitse oikeustyyppi---</option>
            <option value="alaleiri">Alaleiri</option>
            <option value="turva">Turva</option>
            <option value="vima">ViMa</option>
          </select>
          <button
            className="rounded-lg bg-soul p-1 px-10 text-xl"
          >
            Anna oikeudet
          </button>
        </div>
        <AccessList accessList={admins} accessListHeading="Ylläpitäjät"/>
        <AccessList accessList={safety} accessListHeading="Turva"/>
        <AccessList accessList={subcamp} accessListHeading="Alaleiri"/>
      </div>
    </div>
  </>
}
