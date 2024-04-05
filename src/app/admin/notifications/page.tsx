import Link from "next/link";
import {getMessages} from "@/firebaseAdmin";

export default function Home() {
    const messages = getMessages()
    return (
    <div className="relative h-full w-screen overflow-hidden bg-helsinki">
        <div
            className="bg-white inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-opacity-0 p-2.5">
            <div className="bg-white inline-flex items-center justify-between self-stretch bg-opacity-0">
                <div className="absolute h-12 w-12"></div>
                <div className="material-symbols-outlined z-10 text-[49px] text-tokio">
                    <Link href="./">arrow_left_alt</Link>
                </div>
                <div className="z-10 font-opensauce text-4xl text-tokio ">
                    Ilmoitukset
                </div>
                <div className="material-symbols-outlined z-10 text-[49px] text-tokio">
                    <Link href="./notifications/new">add_circle</Link>
                </div>
            </div>
        </div>
    </div>
    )
        }