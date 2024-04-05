"use client"

import React, { useState } from "react"

const Sort = (props: { title: string; options: string[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleSort = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option))
    } else {
      setSelectedOptions([...selectedOptions, option])
    }
    setIsOpen(true)
  }

  return (
    <div className="relative z-20 w-1/3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative grid w-full items-start overflow-hidden rounded-t-[20px] bg-tokio transition-all ${
          isOpen ? "" : "rounded-b-[20px] delay-300"
        } duration-500 ease-in-out`}
      >
        <div className=" inline-flex h-7 items-center justify-between rounded-[20px] px-[11px] py-0.5 shadow">
          <div className="h-3 w-[60px] font-poppins text-sm font-normal leading-[10px] text-helsinki">
            {props.title}
          </div>
          <div className="relative h-6 w-6">
            <div className="material-symbols-outlined left-0 top-0 h-6 text-helsinki">
              <a>keyboard_arrow_down</a>
            </div>
          </div>
        </div>
      </button>
      <div
        className={`relative grid h-auto w-full items-start overflow-hidden text-left transition-all ${
          isOpen ? "delay-250 max-h-[500px] rounded-b-[20px]" : "max-h-0"
        } transition-max-height duration-500 ease-in-out`}
      >
        {props.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSort(option)}
            className={`w-full break-all p-2  text-left  ${
              selectedOptions.includes(option)
                ? "bg-gray text-ateena"
                : "bg-tokio text-helsinki"
            }`}
          >
            {" " + option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Sort
