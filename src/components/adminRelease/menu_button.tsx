"use client"
import {useState} from "react";
interface MenuButtonProps {
    title: string;
    options: string[];
    isTimeInput?: boolean;
    className?: string;
    onOptionChange?: (option: string) => void;
}

export const Menu_button = ({ title, options, isTimeInput, className, onOptionChange }: MenuButtonProps & { onOptionChange?: (option: string) => void }) => {
    const defaultDate = new Date().toISOString().split('T')[0];
    const defaultTime = new Date().toLocaleTimeString().slice(0,5).replace('.', ':');
    console.log(defaultTime)

    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [selectedDate, setSelectedDate] = useState(defaultDate);
    const [selectedTime, setSelectedTime] = useState(defaultTime);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        if (onOptionChange) {
            onOptionChange(option);
        }
    }
    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    }
    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    }

    return (
        <div className={`w-full ml-4 mr-4 inline-flex justify-between items-center ${className}`}>
            <div className="w-1/2">
                {isTimeInput ? (
                    <input
                        type="date"
                        value={selectedDate}
                        min={"2022-01-01"}
                        onChange={(e) => handleDateSelect(e.target.value)}
                        className="text-white bg-oslo text-2xl sm:text-lg font-bold font-poppins w-4/5"
                    />
                ) : (
                    <p
                        className="text-white text-2xl sm:text-lg font-bold font-poppins">{title}
                    </p>
                )}
            </div>
            <div className=" w-1/2 h-10 flex justify-between items-center">
                {isTimeInput ? (
                    <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => handleTimeSelect(e.target.value)}
                        className="text-white bg-oslo text-2xl sm:text-lgfont-bold font-poppins w-4/5"
                    />
                ) : (
                    <select
                        value={selectedOption}
                        onChange={(e) => handleSelect(e.target.value)}
                        className="text-white bg-oslo text-2xl sm:text-lg font-bold font-poppins w-4/5">
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                )}
            </div>
        </div>
    )
}
export default Menu_button