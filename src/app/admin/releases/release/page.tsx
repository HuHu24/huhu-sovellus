"use client"

import {useEffect, useRef, useState} from "react"
import { useRouter } from "next/navigation"
import { format } from 'date-fns';

import Menu_button from "@/components/adminRelease/menu_button";

export default function Home() {
  const [imageSrc, setImageSrc] = useState('/huhu-sovellus/huhuymp.png');
  const [selectedOptions, setSelectedOptions] = useState({Ajastus: "Ei",Kohderyhma: "Kaikki"});
  const today = format(new Date(), 'dd.MM.yyyy HH:mm');  const router = useRouter()
  const [lightMode, setLightMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const divRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !(divRef.current as any).contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const toggleLightMode = () => {
    setLightMode(!lightMode)
  }
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const handleOptionChange = (title:string, option:string) => {
    setSelectedOptions(prevOptions => ({ ...prevOptions, [title]: option }));
    console.log(selectedOptions)
  };
  return (
      <>
        <div
            ref={divRef}
            className={`fixed bottom-[60px] overflow-y-scroll overflow-x-hidden rounded-t-2xl z-20 w-screen ${isOpen ? " h-[60%]" : " h-[45px]"} bg-oslo items-center justify-center `}>
          <button onClick={toggleIsOpen} className="w-screen h-10">
            <div className="relative rounded-2xl w-1/5 mt-3 h-[5px] bg-ateena m-auto"></div>
          </button>
          {isOpen ? (
              <form id={"main"} action="" className="flex flex-col justify-between mt-2 h-[80%]">
                <Menu_button title="Kohderyhmä" options={["Kaikki", "Alaleiri", "Tekijät"]}
                             onOptionChange={(option) => handleOptionChange("Kohderyhma", option)}></Menu_button>
                <Menu_button title="Alaleiri" className={selectedOptions.Kohderyhma !=="Alaleiri" ? "pointer-events-none opacity-25" : ""} options={["1", "2", "3", "4"]}
                             onOptionChange={(option) => handleOptionChange("Alaleiri", option)}></Menu_button>
                <Menu_button title="Ajastus" options={["Ei", "Kyllä"]}
                             onOptionChange={(option) => handleOptionChange("Ajastus", option)}></Menu_button>
                <Menu_button title="a" options={["a"]} className={selectedOptions.Ajastus === "Ei" ? "pointer-events-none opacity-25" : ""} isTimeInput={true}
                             onOptionChange={(option) => handleOptionChange("a", option)}></Menu_button>
                <Menu_button title="Piilotettu" options={["Kyllä", "Ei"]}
                             onOptionChange={(option) => handleOptionChange("Piilotettu", option)}></Menu_button>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <input className="w-1/2 h-full rounded-2xl bg-tokio font-poppins text-xl font-bold cursor-pointer"
                         value="tallenna" type="submit"></input>
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
              className={`flex max-h-[50%] w-auto h-auto max-w-[100%] items-center justify-center`}
          >
            <input
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
                className="h-full absolute w-full border-helsinki align-middle"
                alt=""
            />

            <img src={imageSrc} className="" alt=""/>
          </div>
          <button onClick={() => router.back()} className="z-10">
            <div
                className="material-symbols-outlined fixed left-0 top-0 text-[49px] text-buenos_aires shadow-buenos_aires text-shadow">
              arrow_left_alt
            </div>
          </button>
          <div
              className={`relative h-full  w-full ${
                  lightMode ? "text-helsinki bg-ateena" : "bg-helsinki text-ateena"
              }`}
          >
            <div className="mt-3 w-screen">
              <div className="flex justify-between">
                <textarea form={"main"} required={true} autoFocus={true} placeholder="Otsikko"
                          className={`w-full resize-none grid whitespace-normal font-poppins text-5xl ${
                          lightMode ? "text-helsinki bg-ateena" : "text-ateena bg-helsinki"}
                      `}>
                </textarea>
                <button
                    onClick={toggleLightMode}
                    className={`material-symbols-outlined mr-8 text-5xl ${
                        lightMode ? "text-helsinki bg-ateena" : "text-ateena bg-helsinki"
                    }`}
                >
                  {lightMode ? "dark_mode" : "light_mode"}
                </button>
              </div>
              <div className="ml-0 mt-4 whitespace-normal font-poppins text-2xl ">
                <p>{today}</p>
              </div>
              <textarea form={"main"} placeholder="Julkaisija" required={true}
                        className={`ml-0 w-full resize-none whitespace-normal font-poppins text-2xl ${
                          lightMode ? "text-helsinki bg-ateena" : "text-ateena bg-helsinki"}
                      `}>
              </textarea>
            </div>
            <textarea form={"main"} placeholder="Aloita kirjoittaminen tästä" required={true}
                      className={`w-screen h-full mt-2  break-words text-xl ${
                          lightMode ? "text-helsinki bg-ateena" : "text-ateena bg-helsinki"
                      }`}>

            </textarea>
          </div>
        </div>
      </>
  )
}
