"use client"

import { useState } from "react"
import { loginWithEmailAndPassword } from "@/firebase"
import Link from "next/link"

export default function Home() {
    const [data, setData] = useState({
        title: "",
        message: "",
        topic: "",
        page: "",
    })

    const handleSubmit = async (data: any) => {
        const response = await fetch("/api/messaging", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            console.log("Message sent")
        } else {
            console.error("Error: " + response.statusText)
        }
    }

    return (
        <>

            <div className="flex h-screen w-full place-content-center place-items-center text-center font-poppins">
                <div
                    className="mx-4 my-auto flex w-full max-w-[500px] flex-col place-items-center gap-3 rounded-[20px] bg-oslo p-4">

                    <h1 className="text-2xl font-bold">Uusi ilmoitus</h1>
                    <input
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-[80%] rounded-lg bg-barcelona p-1 text-xl text-helsinki"
                        placeholder="Otiskko..."
                    />
                    <input
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-[80%] rounded-lg bg-barcelona p-1 text-xl text-helsinki"
                        placeholder="Sisältö..."
                    /> <select
                    onChange={(event) => setPassword(event.target.value)}
                    className=" w-[80%] rounded-lg bg-barcelona p-1 text-xl text-helsinki">
                    <option>Kohderyhmä</option>
                    <option>Kaikki</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                    <select
                        onChange={(event) => setPassword(event.target.value)}
                        className=" w-[80%] rounded-lg bg-barcelona p-1 text-xl text-helsinki">

                        //
                        <option>Kohderyhmä</option>
                        <option>Kaikki</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>

                    <button
                        onClick={() => handleSubmit(data)}
                        className="rounded-lg bg-soul p-1 px-5 text-xl"
                    >
Lähetä                    </button>
                </div>
            </div>
        </>
    )
}
