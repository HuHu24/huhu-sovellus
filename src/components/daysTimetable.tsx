"use client"

import React, { useState } from "react"
import Image from "next/image"

const Event = () => {
  const [isOpen, setIsOpen] = useState(false)

  const arrowStyle = {
    transition: "transform 0.5s",
    fontSize: "50px",
    transform: isOpen ? "rotate(90deg)" : "rotate(0)",
    display: "inline-block",
    overflow: "hidden",
  }
  const extraInfoStyle = {
    transition: isOpen
      ? "opacity 0.5s, visibility 0.5s"
      : "opacity 0.2s, visibility 0.2s",
    ransitionDelay: isOpen ? "0s" : "0.2s",
    opacity: isOpen ? "1" : "0",
    wordWrap: "break-all",
  }
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "h-auto" : "h-11"
        } relative grid w-full items-start overflow-hidden rounded-[20px] bg-oslo transition-all duration-300 ease-in-out`}
      >
        <div className="place-items-top flex w-full p-2">
          <div className="w-12">
            <div className="font-poppins text-lg">8:30</div>
          </div>
          <div className="pointer-events-none mx-auto font-poppins text-lg font-normal text-ateena">
            Aamupala (oispa)
          </div>
          <div className="h-8 w-8">
            <div
              style={arrowStyle}
              className="material-symbols-outlined -ml-10 -mt-3"
            >
              keyboard_arrow_right
            </div>
          </div>
        </div>
        <div className="pointer-events-none relative bottom-0 flex overflow-auto">
          <div
            style={extraInfoStyle}
            className="pointer-events-none  text-left"
          >
            <p className="pointer-events-none break-all p-2 text-left">
              Extra info
              hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
              Extra info
              hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            </p>
          </div>
        </div>
      </button>
    </div>
  )
}

const DaysTimetable = () => {
  const id = 1

  return (
    <div className="z-10 flex flex-col gap-2">
      <div className=" flex h-12 items-center justify-center gap-2.5 rounded-[20px] bg-soul font-poppins text-2xl text-ateena">
        Maanantai, 5.6.
      </div>
      <div className="flex w-full flex-col gap-2">
        <Event />
        <Event />
        <Event />
      </div>
    </div>
  )
}

export default DaysTimetable
