"use client"


import {env} from "@/env";
import {useEffect, useState} from "react";
import {saveMessagingToken} from "@/messaging";

const fetchUserSettings = async () => {
    const response = await fetch(`${env.NEXT_PUBLIC_URL}/api/auth`);
    const data = await response.text();
    const parsedData = JSON.parse(data);
    return parsedData;
}



export default function Home() {
    const [userSettings, setUserSettings] = useState<any>()
    const [overlay, toggleOverlay] = useState<any>();


    useEffect(() => {
        fetchUserSettings().then((data) => {
            setUserSettings(data);
        });
    }, []); // Empty dependency array means this effect runs once on mount
    const userSubcamp = userSettings?.claims.subcamp;

    const enableOverlay = () => {
        toggleOverlay(!overlay);
        console.log("User settings",userSettings)
        console.log("subcamp",userSubcamp)
    }
    const enableMessaging = async () => {
        const messagingToken = await saveMessagingToken();
        if (userSubcamp)
            await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/notifications`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({subcamp: userSubcamp, token: messagingToken}),
            })
        else {
            alert("Valitse alaleiri")
        }


    }
    const toggleJob = async (job:boolean) => {
            try {
                await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/job`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({job: job}),
                })
                location.reload()
            } catch (e) {
                console.error("Changing job failed:", e)
            }

    }
    async function selectSubcamp(subcamp: number) {
        try {
            await fetch(`${env.NEXT_PUBLIC_URL}/api/auth/claims/subcamp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subcamp: subcamp}),
            })
            alert("Alaleiri valittu")
        } catch (e) {
            console.error("Selecting subcamp failed:", e)
        }
        toggleOverlay(!overlay)
    }

    return (
        <>
            {overlay ? <div className="h-full w-full absolute bg-buenos_aires">
                <div className="flex h-screen w-full place-content-center place-items-center text-center font-poppins">

                    <div
                        className="mx-4 my-auto flex w-full max-w-[500px] flex-col place-items-center gap-3 rounded-[20px] bg-oslo p-4">

                        <h1 className="text-2xl font-bold">Alaleirin valinta</h1>
                        <button
                            onClick={() => selectSubcamp(1)}
                            className="w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki h-10"
                        >Alaleiri 1
                        </button>
                        <button
                            onClick={() => selectSubcamp(2)}
                            className="w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki h-10"
                        >Alaleiri 2
                        </button>
                        <button
                            onClick={() => selectSubcamp(3)}
                            className="w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki h-10"
                        >Alaleiri 3
                        </button>
                        <button
                            onClick={() => selectSubcamp(4)}
                            className="w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki h-10"
                        >Alaleiri 4
                        </button>
                        <button
                            onClick={() => selectSubcamp(5)}
                            className="w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki h-10"
                        >Alaleiri 5
                        </button>
                        <button
                            onClick={() => selectSubcamp(6)}
                            className="w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki h-10"
                        >Alaleiri 6
                        </button>

                    </div>
                </div>
            </div> : null}

            <div className="flex h-screen w-full place-content-center place-items-center text-center font-poppins">

                <div
                    className="mx-4 my-auto flex w-full max-w-[500px] flex-col place-items-center gap-3 rounded-[20px] bg-oslo p-4">

                    <h1 className="text-2xl font-bold">Asetukset</h1>
                    <button
                        onClick={() => enableMessaging()}
                        className="w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki h-10"
                    >Ilmoitukset
                    </button>
                    <button
                        onClick={() => enableOverlay()}
                        className="w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki h-10"
                    >Valitse alaleiri
                    </button>
                    <button
                        onClick={() => toggleJob(!userSettings?.claims.job)}
                        className="w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki h-10"
                    >{userSettings?.claims.job ? "Olen Samoaja" : "Olen Tekijä/Vaeltaja"}
                    </button>
                </div>
            </div>
        </>
    )
}

