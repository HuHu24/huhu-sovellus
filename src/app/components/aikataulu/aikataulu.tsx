import Link from 'next/link';
import React from 'react';

const Taulu = () => {
    return (
        <button className="w-80 h-9 relative flex overflow-hidden">
            <div className="w-80 h-9 left-0 top-0 absolute bg-oslo rounded-[20px]" />
            <div className="ml-4 top-[3.5px] relative text-ateena text-lg font-normal font-['Poppins'] leading-relaxed flex-none">8:30</div>
            <div className="ml-10 top-[3.5px] mr-3 relative text-ateena text-lg font-normal font-['Poppins'] leading-relaxed flex">
                Aamupala (oispa)
            </div>
            <div className="w-9 h-9 left-[280px] top-2 absolute ">
                <div className="w-9 h-9 left-0 top-0 absolute bg-zinc-300" />
                <img className="ml-3 top-[3.5px]" src="keyboard_arrow_right.svg" alt="Nuoli" />
            </div>
        </button>
    );
};


const Aikataulu = () => {
    const id = 1;

    return (
        <div className="w-[357px] h-[188px] flex-col justify-center items-center gap-2.5 inline-flex absolute">
            <div className="w-80 flex-col justify-center items-center gap-2.5 flex">
                <div className="bg-ateena bg-opacity-0 flex-col justify-center items-center gap-[5px] flex">
                    <div className="self-stretch h-12 flex-col justify-center items-center gap-2.5 flex bg-soul rounded-[20px]">
                        <div className="text-ateena text-2xl font-semibold font-['Poppins'] leading-9">Maanantai, 5.6.</div>
                    </div>
                    <Taulu />
                    <Taulu />
                    <Taulu />
                </div>
            </div>
        </div>
    );
};

export default Aikataulu;
