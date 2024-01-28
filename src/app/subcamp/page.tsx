"use client"
import Link from "next/link"
import { anonSignIn } from "@/firebase"
async function selectsubcamp(subcamp: number) {
  await anonSignIn()
  const res = await fetch(
    "http://localhost:3000/huhu-sovellus/api/auth/claims/subcamp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subcamp: subcamp }),
    }
  )
}
export default function Home() {
  return (
    <div className="absolute z-30 flex h-screen w-full place-content-center place-items-center overflow-hidden break-all bg-helsinki text-center font-poppins text-ateena">
      <div className="mx-4 my-auto flex w-full max-w-[500px] flex-col items-center justify-between gap-[5px] rounded-[20px] bg-oslo py-2.5">
        <div className="flex h-full w-full flex-col gap-3 p-5">
          <h1 className="text-4xl">Valitse alaleiri:</h1>
          <Link onClick={() => selectsubcamp(2)} href={"/"}>
            <div className="px-auto w-full rounded-lg bg-buenos_aires p-1 text-3xl text-helsinki">
              Esimerkkileiri 2
            </div>
          </Link>
          <Link onClick={() => selectsubcamp(3)} href={"/"}>
            <div className="px-auto w-full rounded-lg bg-tokio p-1 text-3xl text-helsinki">
              Esimerkkileiri 3
            </div>
          </Link>
          <Link onClick={() => selectsubcamp(4)} href={"/"}>
            <div className="px-auto w-full rounded-lg bg-barcelona p-1 text-3xl text-helsinki">
              Esimerkkileiri 4
            </div>
          </Link>
          <Link onClick={() => selectsubcamp(5)} href={"/"}>
            <div className="px-auto w-full rounded-lg bg-green p-1 text-3xl text-helsinki">
              Esimerkkileiri 5
            </div>
          </Link>
          <Link onClick={() => selectsubcamp(1)} href={"/"}>
            <div className="px-auto w-full rounded-lg bg-soul p-1 text-3xl text-ateena">
              Esimerkkileiri 1
            </div>
          </Link>
          <Link onClick={() => selectsubcamp(6)} href={"/"}>
            <div className="px-auto w-full rounded-lg bg-helsinki p-1 text-3xl text-ateena">
              Esimerkkileiri 6
            </div>
          </Link>
        </div>
      </div>
      <div className="absolute -z-10 h-screen w-screen lg:invisible">
        <img
          src="subcamp_page_background.svg"
          className="fixed bottom-0 w-full"
        />
      </div>
    </div>
  )
}
