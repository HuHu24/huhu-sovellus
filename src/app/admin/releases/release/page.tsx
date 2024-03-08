"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

import MenuButton from "@/components/adminRelease/menuButton"

export default function Home() {
  const [imageSrc, setImageSrc] = useState("/huhu-sovellus/huhuymp.png")
  const [selectedOptions, setSelectedOptions] = useState({
    Ajastus: "Ei",
    Kohderyhma: "Kaikki",
  })
  const today = format(new Date(), "dd.MM.yyyy HH:mm")
  const router = useRouter()
  const [lightMode, setLightMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const divRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !(divRef.current as any).contains(event.target)) {
        setIsOpen(false)
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [divRef])
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  const toggleLightMode = () => {
    setLightMode(!lightMode)
  }
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const handleOptionChange = (title: string, option: string) => {
    setSelectedOptions((prevOptions) => ({ ...prevOptions, [title]: option }))
    console.log(selectedOptions)
  }
  return (
    <>
      <div
        ref={divRef}
        className={`fixed bottom-[60px] z-20 w-screen overflow-x-hidden overflow-y-scroll rounded-t-2xl ${
          isOpen ? " h-[60%]" : " h-[45px]"
        } items-center justify-center bg-oslo `}
      >
        <button onClick={toggleIsOpen} className="h-10 w-screen">
          <div className="relative m-auto mt-3 h-[5px] w-1/5 rounded-2xl bg-ateena"></div>
        </button>
        {isOpen ? (
          <form
            id={"main"}
            action=""
            className="mt-2 flex h-[80%] flex-col justify-between"
          >
            <MenuButton
              title="Kohderyhmä"
              options={["Kaikki", "Alaleiri", "Tekijät"]}
              onOptionChange={(option) =>
                handleOptionChange("Kohderyhma", option)
              }
            ></MenuButton>
            <MenuButton
              title="Alaleiri"
              className={
                selectedOptions.Kohderyhma !== "Alaleiri"
                  ? "pointer-events-none opacity-25"
                  : ""
              }
              options={["1", "2", "3", "4"]}
              onOptionChange={(option) =>
                handleOptionChange("Alaleiri", option)
              }
            ></MenuButton>
            <MenuButton
              title="Ajastus"
              options={["Ei", "Kyllä"]}
              onOptionChange={(option) => handleOptionChange("Ajastus", option)}
            ></MenuButton>
            <MenuButton
              title="a"
              options={["a"]}
              className={
                selectedOptions.Ajastus === "Ei"
                  ? "pointer-events-none opacity-25"
                  : ""
              }
              isTimeInput={true}
              onOptionChange={(option) => handleOptionChange("a", option)}
            ></MenuButton>
            <MenuButton
              title="Julkaisu"
              options={["Ei", "Kyllä"]}
              onOptionChange={(option) =>
                handleOptionChange("Julkaistu", option)
              }
            ></MenuButton>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                className="h-full w-1/2 cursor-pointer rounded-2xl bg-tokio p-2 font-poppins text-xl font-bold"
                value="tallenna"
                type="submit"
              ></input>
            </div>
          </form>
        ) : null}
      </div>
      <div
        className={`h-screen w-screen overflow-hidden ${
          lightMode ? "bg-ateena" : "bg-helsinki"
        } mb-4 overflow-y-auto overflow-x-hidden`}
      >
        <div
          className={`flex h-auto max-h-[50%] w-auto max-w-[100%] items-center justify-center`}
        >
          <input
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
            className="absolute h-full w-full border-helsinki align-middle"
            alt=""
          />

          <img src={imageSrc} className="" alt="" />
        </div>
        <button onClick={() => router.back()} className="z-10">
          <div className="material-symbols-outlined fixed left-0 top-0 text-[49px] text-buenos_aires shadow-buenos_aires text-shadow">
            arrow_left_alt
          </div>
        </button>
        <div
          className={`relative h-full  w-full ${
            lightMode ? "bg-ateena text-helsinki" : "bg-helsinki text-ateena"
          }`}
        >
          <div className="mt-3 w-screen">
            <div className="flex justify-between">
              <textarea
                form={"main"}
                required={true}
                autoFocus={true}
                placeholder="Otsikko"
                className={`grid w-full resize-none whitespace-normal font-poppins text-5xl ${
                  lightMode
                    ? "bg-ateena text-helsinki"
                    : "bg-helsinki text-ateena"
                }
                      `}
              ></textarea>
              <button
                onClick={toggleLightMode}
                className={`material-symbols-outlined mr-8 text-5xl ${
                  lightMode
                    ? "bg-ateena text-helsinki"
                    : "bg-helsinki text-ateena"
                }`}
              >
                {lightMode ? "dark_mode" : "light_mode"}
              </button>
            </div>
            <div className="ml-0 mt-4 whitespace-normal font-poppins text-2xl ">
              <p>{today}</p>
            </div>
            <input
              form={"main"}
              placeholder="Julkaisija"
              required={true}
              className={`ml-0 w-full resize-none whitespace-normal p-1 font-poppins text-2xl ${
                lightMode
                  ? "bg-ateena text-helsinki"
                  : "bg-helsinki text-ateena"
              }
                      `}
            ></input>
          </div>
          <textarea
            form={"main"}
            placeholder="Aloita kirjoittaminen tästä"
            required={true}
            className={`mt-2 h-full w-screen break-words  p-1 text-xl ${
              lightMode ? "bg-ateena text-helsinki" : "bg-helsinki text-ateena"
            }`}
          ></textarea>
        </div>
      </div>
    </>
  )
}
