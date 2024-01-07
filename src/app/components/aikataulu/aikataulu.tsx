import React, { useState } from 'react';

const Taulu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const arrowStyle = {
        transition: 'transform 0.5s',
        transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
    };
const extraInfoStyle = {
    transition: isOpen ? 'opacity 0.5s, visibility 0.5s' : 'opacity 0.2s, visibility 0.2s',
    ransitionDelay: isOpen ? '0s' : '0.2s',
    opacity: isOpen ? '1' : '0',
};
    return (
        <div className='w-full text relative'>
            <button onClick={() => setIsOpen(!isOpen)}
                    className={`w-full ${isOpen ? 'h-16' : 'h-9'} bg-oslo rounded-[20px] relative flex overflow-hidden self-stretch items-start justify-center transition-all duration-500 ease-in-out`}>
                <div
                    className={`w-full absolute bg-oslo rounded-[20px] flex-col transition-all duration-500 ease-in-out ${
                        isOpen ? 'h-24' : 'h-9'
                    } left-0 top-0`}
                />
                <div className="ml-4 relative text-lg font-normal font-['Poppins'] leading-relaxed flex-col">
                    8:30
                </div>
                <div
                    className="flex-grow relative text-ateena text-lg font-normal font-['Poppins'] leading-relaxed flex-col flex items-center justify-center">
                    Aamupala (oispa)
                </div>
                <div className="w-9 h-9 right-4 top-0 relative bg-zinc-300 flex items-center justify-center">
                    <img
                        style={arrowStyle}
                        className="w-5 h-5"
                        src="keyboard_arrow_right.svg"
                        alt="Nuoli"
                    />
                </div>
            </button>
            <div className="absolute left-0 bottom-0">
                <div
                    style={extraInfoStyle}
                    className="pointer-events-none text-left p-4 rounded-b-[20px] -mt-4"
                >
                    <p className="pointer-events-none">Extra info here</p>
                </div>
            </div>
        </div>
    );
};

const Aikataulu = () => {
    const id = 1;

    return (
        <div className="w-screen h-[200px] justify-center gap-2.5 relative">
            <div className="w-screen justify-center items-center gap-2.5">
            <div className="bg-ateena bg-opacity-0 flex-col justify-center items-center gap-[5px] flex w-screen">
                    <div className="self-stretch h-12 flex justify-center items-center gap-2.5 flex bg-soul rounded-[20px]">
                        <div className=" ml-4 absolute text-ateena text-2xl font-semibold font-['Poppins'] leading-9">
                            Maanantai, 5.6.
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <Taulu />
                        <Taulu />
                        <Taulu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aikataulu;