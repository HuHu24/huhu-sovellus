import React from 'react';
import { getImage, otsikko, teksti } from "@/app/components/tiedote/tiedot";

const Tiedote = () => {
    const id = 1;
    return (
        <div className="relative flex-none mb-4 mr-4 mt-4">
        <div>
            <div className="w-[180px] h-[250px] relative overflow-clip">
                <div className="w-[180px] left-[15px] top-[180px] absolute text-ateena text-xs font-normal font-['Open Sans'] whitespace-normal">
                    {teksti(String(id))}
                </div>
                <div className="left-[15px] top-[151px] absolute text-ateena text-base font-normal font-['Poppins'] whitespace-normal">
                    {otsikko(String(id))}
                </div>
                <div className="w-[180px] h-[150px] left-0 top-0 absolute bg-ateena rounded-[20px] border-2 border-helsinki" />
                <img className="w-[151px] h-[151px] left-[14px] top-0 absolute rounded-[30px]" src={getImage('huhuymp')} />
            </div>
        </div>
        </div>
    );
};

const tiedotteet = () => {
    return (
        <div className="flex overflow-x-auto">
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
<Tiedote />
        </div>
    );
}

export default tiedotteet;
