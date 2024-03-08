"use client"
import { useState } from "react"
interface MenuButtonProps {
  title: string
  options: string[]
  isTimeInput?: boolean
  className?: string
  onOptionChange?: (option: string) => void
}

export const MenuButton = ({
  title,
  options,
  isTimeInput,
  className,
  onOptionChange,
}: MenuButtonProps & { onOptionChange?: (option: string) => void }) => {
  const defaultDate = new Date().toISOString().split("T")[0]
  const defaultTime = new Date()
    .toLocaleTimeString()
    .slice(0, 5)
    .replace(".", ":")
  console.log(defaultTime)

  const [selectedOption, setSelectedOption] = useState(options[0])
  const [selectedDate, setSelectedDate] = useState(defaultDate)
  const [selectedTime, setSelectedTime] = useState(defaultTime)

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    if (onOptionChange) {
      onOptionChange(option)
    }
  }
  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  return (
    <div
      className={`ml-4 mr-4 inline-flex w-full items-center justify-between ${className}`}
    >
      <div className="w-1/2">
        {isTimeInput ? (
          <input
            type="date"
            value={selectedDate}
            min={"2022-01-01"}
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
            value={selectedTime}
            onChange={(e) => handleTimeSelect(e.target.value)}
            className="text-white sm:text-lgfont-bold w-4/5 bg-oslo font-poppins text-2xl"
          />
        ) : (
          <select
            value={selectedOption}
            onChange={(e) => handleSelect(e.target.value)}
            className="text-white w-4/5 bg-oslo font-poppins text-2xl font-bold sm:text-lg"
          >
            {options.map((option, index) => (
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
