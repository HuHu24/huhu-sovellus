"use client"
import { useEffect, useState } from "react"
import MenuButtonProps from "@/types/menuButton"
export const MenuButton = ({
  title,
  options,
  isTimeInput,
  className,
  onOptionChange,
  value,
}: MenuButtonProps & { onOptionChange?: (option: string) => void }) => {
  const defaultDate = new Date().toISOString().split("T")[0]
  const defaultTime = new Date()
    .toLocaleTimeString()
    .slice(0, 5)
    .replace(".", ":")

  const [selectedOption, setSelectedOption] = useState(value || options[0])
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: defaultDate,
    time: defaultTime,
  })

  useEffect(() => {
    if (value)
      if (isTimeInput) {
        setSelectedDateTime({
          // @ts-ignore
          date: value[0] || defaultDate,
          // @ts-ignore
          time: value[1] || defaultTime,
        })
      } else {
        setSelectedOption(value || options[0])
      }
  }, [value, options, isTimeInput, defaultDate, defaultTime])

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    if (onOptionChange) {
      onOptionChange(option)
    }
  }
  const handleDateSelect = (date: string) => {
    setSelectedDateTime((prevState) => ({ ...prevState, date }))
    setSelectedOption(date)
    if (onOptionChange) {
      onOptionChange(date)
    }
  }

  const handleTimeSelect = (time: string) => {
    console.log("time", time)
    setSelectedOption(time)
    setSelectedDateTime((prevState) => ({ ...prevState, time }))
    if (onOptionChange) {
      onOptionChange(time)
    }
  }

  return (
    <div
      className={`ml-4 mr-4 inline-flex w-full items-center justify-between ${className}`}
    >
      <div className="w-1/2">
        {isTimeInput ? (
          <input
            type="date"
            value={selectedDateTime.date}
            onChange={(e) => handleDateSelect(e.target.value)}
            className="text-white w-4/5 bg-oslo font-poppins text-2xl font-bold sm:text-lg"
          />
        ) : (
          <p className="text-white font-poppins text-2xl font-bold sm:text-lg">
            {title}
          </p>
        )}
      </div>
      <div className=" flex h-10 w-1/2 items-center justify-between">
        {isTimeInput ? (
          <input
            type="time"
            value={selectedDateTime.time}
            onChange={(e) => handleTimeSelect(e.target.value)}
            className="text-white sm:text-lgfont-bold w-4/5 bg-oslo font-poppins text-2xl"
          />
        ) : (
          <select
            value={selectedOption}
            onChange={(e) => handleSelect(e.target.value)}
            className="text-white w-4/5 bg-oslo font-poppins text-2xl font-bold sm:text-lg"
          >
            {options.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}
export default MenuButton
