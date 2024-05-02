"use client"
import React, { useEffect, useState } from "react"

const Events = () => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    const storedEvents = localStorage.getItem("events")
    if (storedEvents) {
      JSON.parse(storedEvents)
      setEvents(JSON.parse(storedEvents))
    }
  }, [])
  return (
    <div>
      <h1 className="font-poppins text-lg">
        Olet ilmoittautunut seuraaviin ohjelmiin:
      </h1>
      {events.map((event, index) => (
        <div className="font-opensauce text-lg" key={index}>
          <p>{event}</p>
        </div>
      ))}
    </div>
  )
}

export default Events
