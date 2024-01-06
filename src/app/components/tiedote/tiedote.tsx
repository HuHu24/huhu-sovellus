import Link from 'next/link';
import React from 'react';
import { getImage, otsikko, teksti } from "@/app/components/tiedote/tiedot";

const tiedote = () => {
    const id = 1
    return (
        <div>
            <div className="w-[180px] h-[250px] relative overflow-clip">
                <div className="w-[180px] left-[15px] top-[180px] absolute text-ateena text-xs font-normal font-['Open Sans'] whitespace-normal">
                    {teksti(id)}
                </div>
                <div className="left-[15px] top-[151px] absolute text-ateena text-base font-normal font-['Poppins'] whitespace-normal">
                    {otsikko(id)}
                </div>
                <div className="w-[180px] h-[150px] left-0 top-0 absolute bg-ateena rounded-[20px] border-2 border-helsinki" />
                <img className="w-[151px] h-[151px] left-[14px] top-0 absolute rounded-[30px]" src={getImage('huhuymp')} />
            </div>
        </div>
    );
};


export default tiedote;
