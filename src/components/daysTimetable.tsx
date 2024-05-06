"use client"

import React, { useState } from "react"
import Image from "next/image"
interface EventProps {
  date: string
  description: string
  isActivity: boolean
  time: string
  title: string
}

const Event = ({ date, time, title, description, isActivity }: EventProps) => {
  const [isOpen, setIsOpen] = useState(false)
  let events =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("events") || "[]")
      : []
  const [joined, setJoined] = useState(
    events ? events.includes(`${date} ${time} ${title}`) : false
  )
  const joinEvent = (date: string, time: string, title: string) => {
    const name = prompt("Oma nimi kiitos!")
    fetch("/api/auth/joinEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: time,
        name: name,
        title: title,
        date: date,
      }),
    }).then((response) => {
      if (response.ok) {
        events.push(`${date} ${time} ${title}`)
        if (typeof window !== "undefined") {
          localStorage.setItem("events", JSON.stringify(events))
        }
        setJoined(true)
      } else if (response.status === 401) {
        alert("Ohjelma on täynnä")
      }
    })
  }
  const leaveEvent = (date: string, time: string, title: string) => {
    fetch("/api/auth/joinEvent", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: time,
        title: title,
        date: date,
      }),
    }).then((response) => {
      if (response.ok) {
        events.splice(events.indexOf(`${date} ${time} ${title}`), 1)
        if (typeof window !== "undefined") {
          localStorage.setItem("events", JSON.stringify(events))
        }
        setJoined(false)
      }
    })
  }

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
    transitionDelay: isOpen ? "0s" : "0.2s",
    opacity: isOpen ? "1" : "0",
  }
  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? "h-auto" : "h-11"
        } relative grid w-full items-start overflow-hidden rounded-[20px] bg-oslo transition-all duration-300 ease-in-out`}
      >
        <div className="place-items-top flex w-full p-2">
          <div className="w-12">
            <div className="font-poppins text-lg">{time}</div>
          </div>
          <div className="pointer-events-none mx-auto font-poppins text-lg font-normal text-ateena">
            {title}
          </div>
          <div className="w-12">
            <Image
              style={arrowStyle}
              className="ml-auto h-5 w-5"
              src="keyboard_arrow_right.svg"
              alt="Nuoli"
              width={20}
              height={20}
            />
          </div>
        </div>
        <div className="pointer-events-none relative bottom-0 flex overflow-auto">
          <div
            style={extraInfoStyle}
            className="pointer-events-none  text-left"
          >
            <p className="pointer-events-none break-all p-2 text-left">
              {description}
            </p>
          </div>
        </div>
      </button>
      {isActivity && isOpen ? (
        joined ? (
          <button
            onClick={() => leaveEvent(date, time, title)}
            className="mt-1 h-12 w-full rounded-2xl bg-soul font-poppins text-xl"
          >
            Poistu ohjelmasta
          </button>
        ) : (
          <button
            onClick={() => joinEvent(date, time, title)}
            className="mt-1 h-12 w-full rounded-2xl bg-soul font-poppins text-xl"
          >
            Liity ohjelmaan
          </button>
        )
      ) : null}
    </div>
  )
}

interface DaysTimetableProperties {
  date: string
  events: {
    isActivity: boolean
    time: string
    title: string
    description: string
  }[]
}

const DaysTimetable = ({ date, events }: DaysTimetableProperties) => {
  return (
    <div className="z-10 flex flex-col gap-2">
      <div className=" flex h-12 items-center justify-center gap-2.5 rounded-[20px] bg-soul font-poppins text-2xl text-ateena ">
        {date}
      </div>
      <div className="flex w-full flex-col gap-2">
        {events.map((event, key) => (
          <Event
            key={key}
            isActivity={event.isActivity}
            time={event.time}
            date={date}
            title={event.title}
            description={event.description}
          />
        ))}
      </div>
    </div>
  )
}

export default DaysTimetable
