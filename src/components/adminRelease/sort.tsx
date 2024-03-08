"use client"

import React, { useState } from "react"

interface SortProps {
    title: string;
    options: string[];
}

const Sort: React.FC<SortProps> = ({title, options }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const handleSort = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(o => o !== option))
        } else {
            setSelectedOptions([...selectedOptions, option])
        }
        setIsOpen(true);
        console.log(option)
    }

    return (
        <div className="relative w-1/3 z-20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative grid w-full items-start overflow-hidden transition-all bg-tokio rounded-t-[20px] ${isOpen ? '' : 'rounded-b-[20px] delay-300'} duration-500 ease-in-out`}
            >
                <div
                    className=" h-7 px-[11px] py-0.5 rounded-[20px] shadow justify-between items-center inline-flex">
                    <div
                        className="w-[60px] h-3 text-helsinki text-sm font-normal font-poppins leading-[10px]">{title}
                    </div>
                    <div className="w-6 h-6 relative">
                        <div className="material-symbols-outlined h-6 left-0 top-0 text-helsinki">
                            <a>keyboard_arrow_down</a>
                        </div>
                    </div>
                </div>
            </button>
            <div
                className={`text-left h-auto relative grid w-full items-start overflow-hidden transition-all ${isOpen ? 'max-h-[500px] rounded-b-[20px] delay-250' : 'max-h-0'} duration-500 ease-in-out transition-max-height`}
            >
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleSort(option)}
                        className={`break-all p-2 text-left  w-full  ${selectedOptions.includes(option) ? "bg-gray text-ateena" : "bg-tokio text-helsinki"}`}
                    >
                        {" "+option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Sort