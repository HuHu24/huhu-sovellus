import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="absolute z-30 flex h-screen w-full place-content-center place-items-center overflow-hidden break-all bg-helsinki text-center font-poppins text-ateena">
      <div className="hmy-auto mx-5 flex max-h-[500px] w-full max-w-[500px] flex-col items-center justify-between gap-[5px] rounded-[20px] bg-oslo py-2.5">
        <h1 className="text-5xl">Valitse alaleiri:</h1>
        <div className="flex h-full w-full flex-col gap-[10px] p-2">
          <Link href={"/"}>
            <div className="px-auto w-full rounded-[10px] bg-buenos_aires p-0.5 text-4xl text-helsinki">
              Esimerkkileiri 2
            </div>
          </Link>
          <Link href={"/"}>
            <div className="px-auto w-full rounded-[10px] bg-tokio p-0.5 text-4xl text-helsinki">
              Esimerkkileiri 3
            </div>
          </Link>
          <Link href={"/"}>
            <div className="px-auto w-full rounded-[10px] bg-barcelona p-0.5 text-4xl text-helsinki">
              Esimerkkileiri 4
            </div>
          </Link>
          <Link href={"/"}>
            <div className="px-auto w-full rounded-[10px] bg-green p-0.5 text-4xl text-helsinki">
              Esimerkkileiri 5
            </div>
          </Link>
          <Link href={"/"}>
            <div className="px-auto w-full rounded-[10px] bg-soul p-0.5 text-4xl text-ateena">
              Esimerkkileiri 1
            </div>
          </Link>
          <Link href={"/"}>
            <div className="px-auto w-full rounded-[10px] bg-helsinki p-0.5 text-4xl text-ateena">
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
