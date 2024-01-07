'use client';
import Tiedotteet from '@/app/components/tiedote/tiedote';
import Aikataulu from "@/app/components/aikataulu/aikataulu";

export default function Home() {
    return (
        <div className="relative h-screen bg-helsinki overflow-hidden">
            <div className="absolute -top-40 -right-40 p-2.5">
                <div className="w-[360px] h-[369px] justify-start items-end gap-2.5 inline-flex">
                    <div className="grow shrink basis-0 self-stretch bg-barcelona rounded-full"/>
                </div>
            </div>
            <div className="absolute -bottom-48 -left-48 p-2.5 ">
                <div className="w-[341px] h-[341px] flex-col justify-start items-end gap-2.5 inline-flex">
                    <div className="self-stretch grow shrink basis-0 bg-soul rounded-full"/>
                </div>
            </div>
            <Tiedotteet/>
            <div className="w-full">
                <Aikataulu></Aikataulu>
            </div>
        </div>

    );
}
