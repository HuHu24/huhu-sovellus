import Link from "next/link"

export default function Home() {
  return (
    <div className="absolute z-30 flex h-screen w-full place-content-center place-items-center overflow-hidden break-all bg-helsinki text-center font-poppins text-ateena">
      <div className="my-auto mx-4 flex w-full max-w-[500px] flex-col items-center justify-between gap-[5px] rounded-[20px] bg-oslo py-2.5">
        <div className="flex h-full w-full flex-col gap-3 p-5">
          <h1 className="text-4xl">Valitse alaleiri:</h1>
          <Link href={"/"}>
            <div className="px-auto w-full rounded-lg bg-buenos_aires p-1 text-3xl text-helsinki">
              Esimerkkileiri 2
            </div>
          </Link>
          <Link href={"/"}>
            <div className="px-auto w-full rounded-lg bg-tokio p-1 text-3xl text-helsinki">
              Esimerkkileiri 3
            </div>
          </Link>
          <Link href={"/"}>
            <div className="px-auto w-full rounded-lg bg-barcelona p-1 text-3xl text-helsinki">
              Esimerkkileiri 4
            </div>
          </Link>
          <Link href={"/"}>
            <div className="px-auto w-full rounded-lg bg-green p-1 text-3xl text-helsinki">
              Esimerkkileiri 5
            </div>
          </Link>
          <Link href={"/"}>
            <div className="px-auto w-full rounded-lg bg-soul p-1 text-3xl text-ateena">
              Esimerkkileiri 1
            </div>
          </Link>
          <Link href={"/"}>
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
