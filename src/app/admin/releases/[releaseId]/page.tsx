"use client"

import React, { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { format } from "date-fns"

import MenuButton from "@/components/adminRelease/menuButton"
import { getRelease } from "@/firebase"

export default function Home() {
  const router = useRouter()
  const [imageSrc, setImageSrc] = useState("/huhuymp.png")
  const [formValues, setFormValues] = useState({
    targetGroup: "Kaikki",
    subcamp: "",
    timed: "Ei",
    time: "",
    date: "",
    released: "Ei",
    title: "",
    releaser: "",
    content: "",
    image: "/huhuymp.png",
    id: "",
    importance: "",
  })
  const releaseId = usePathname().split("/").pop() || ""
  const [data, setData] = useState<any>(null)
  useEffect(() => {
    const fetchReleaseData = async () => {
      const releaseData = await getRelease(releaseId)
      if (releaseData) {
        setData(releaseData)
      }
    }

    fetchReleaseData().catch((error) => {
      console.error("Error fetching release data:", error)
    })
  }, [releaseId])

  useEffect(() => {
    if (data) {
      setFormValues({
        targetGroup: data.targetGroup || "",
        subcamp: data.subcamp || "",
        timed: data.timed || "",
        time: data.time || "",
        date: data.date || "",
        released: data.released || "",
        title: data.title || "",
        releaser: data.releaser || "",
        content: data.content || "",
        image: data.image || "",
        importance: data.importance || "",
        id: releaseId,
      })
    }
  }, [data, releaseId])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch("/api/releases", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })

    if (!response.ok) {
      console.error("Failed to submit form")
      alert("Failed to submit form")
    } else {
      alert("Form submitted")
      router.push("./")
    }
  }

  const [lightMode, setLightMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const divRef = useRef(null)
  useEffect(() => {
    console.log(formValues)
  }, [formValues])
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
    if (title === "timeanddate") {
      if (option.length != 5)
        setFormValues((prevValues) => ({ ...prevValues, ["Date"]: option }))
      else setFormValues((prevValues) => ({ ...prevValues, ["Time"]: option }))
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [title]: option }))
    }
    console.log(formValues)
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
            onSubmit={handleSubmit}
          >
            <MenuButton
              title="Kohderyhmä"
              options={["Kaikki", "Alaleiri", "Tekijät"]}
              onOptionChange={(option) =>
                handleOptionChange("targetGroup", option)
              }
            ></MenuButton>
            <MenuButton
              title="Alaleiri"
              className={
                formValues.targetGroup !== "Alaleiri"
                  ? "pointer-events-none opacity-25"
                  : ""
              }
              options={["1", "2", "3", "4"]}
              onOptionChange={(option) => handleOptionChange("subcamp", option)}
            ></MenuButton>
            <MenuButton
              title="Kriittisyys"
              options={["Kriittinen", "Vähemmän kriittinen", "Ei kriittinen"]}
              onOptionChange={(option) =>
                handleOptionChange("importance", option)
              }
            ></MenuButton>

            <MenuButton
              title="Ajastus"
              options={["Ei", "Kyllä"]}
              onOptionChange={(option) => handleOptionChange("timed", option)}
            ></MenuButton>
            <MenuButton
              title="Aika"
              options={["a"]}
              className={
                formValues.timed === "Ei"
                  ? "pointer-events-none opacity-25"
                  : ""
              }
              isTimeInput={true}
              onOptionChange={(option) => {
                handleOptionChange("timeAndDate", option)
              }}
            />
            <MenuButton
              title="Julkaisu"
              options={["Ei", "Kyllä"]}
              onOptionChange={(option) =>
                handleOptionChange("released", option)
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
                onClick={() => handleSubmit}
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
                value={formValues.title}
                onChange={(e) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    Title: e.target.value,
                  }))
                }
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
              <p>{format(new Date(), "dd.MM.yyyy HH:mm")}</p>
            </div>
            <input
              form={"main"}
              placeholder="Julkaisija"
              required={true}
              value={formValues.releaser}
              onChange={(e) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  Releaser: e.target.value,
                }))
              }
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
            value={formValues.content}
            onChange={(e) =>
              setFormValues((prevValues) => ({
                ...prevValues,
                Content: e.target.value,
              }))
            }
            className={`mt-2 h-full w-screen break-words  p-1 text-xl ${
              lightMode ? "bg-ateena text-helsinki" : "bg-helsinki text-ateena"
            }`}
          ></textarea>
        </div>
      </div>
    </>
  )
}
