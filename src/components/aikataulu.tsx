"use client"

import React, {useState} from 'react';
import Image from 'next/image';

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
    <div className='relative'>
      <button onClick={() => setIsOpen(!isOpen)}
              className={`${isOpen ? 'h-[70px]' : 'h-11'} w-full  bg-oslo rounded-[20px] relative flex overflow-hidden items-start transition-all duration-300 ease-in-out`}>
        <div className="w-full flex place-items-center p-2">
          <div className="w-12">
            <div className="text-lg font-poppins">
              8:30
            </div>
          </div>
          <div
            className="mx-auto text-ateena text-lg font-normal font-poppins">
            Aamupala (oispa)
          </div>
          <div className="w-12">
            <Image
              style={arrowStyle}
              className="w-5 h-5 ml-auto"
              src="keyboard_arrow_right.svg"
              alt="Nuoli"
              width={20}
              height={20}
            />
          </div>
        </div>
      </button>
      <div className="absolute bottom-0">
        <div style={extraInfoStyle} className="pointer-events-none text-left p-2">
          <p className="pointer-events-none">Extra info here</p>
        </div>
      </div>
    </div>
  );
};

const Aikataulu = () => {
  const id = 1;

  return (
    <div className="flex flex-col gap-2">
      <div className=" h-12 flex justify-center items-center gap-2.5 bg-soul rounded-[20px] text-ateena text-2xl font-poppins">
        Maanantai, 5.6.
      </div>
      <div className="flex flex-col w-full gap-2">
        <Taulu/>
        <Taulu/>
        <Taulu/>
      </div>
    </div>
  );
};

export default Aikataulu;