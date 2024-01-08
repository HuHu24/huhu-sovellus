import Aikataulu from "@/components/aikataulu"

export default function Home() {
    return (
        <div className="relative h-[calc(100vh-70px)] w-full overflow-hidden bg-helsinki">
            <div
                className="w-full h-[68px] p-2.5 bg-white bg-opacity-0 flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="self-stretch bg-white bg-opacity-0 justify-between items-center inline-flex">
                    <div className="w-12 h-12 absolute">
                    </div>
                    <div className="text-helsinki text-[49px] material-symbols-outlined z-10">
                        <a href="./">arrow_left_alt</a>
                    </div>
                    <div className="text-tokio text-4xl font-normal font-opensauce z-10 ">Aikataulu</div>
                </div>
            </div>
            <div className="absolute -left-44 -top-44 p-2.5">
                <div className="inline-flex h-[369px] w-[360px] items-end justify-start gap-2.5 -z-1">
                    <div className="shrink grow basis-0 self-stretch rounded-full bg-buenos_aires z-0"/>
                </div>
            </div>
            <div className="absolute -bottom-48 -right-48 p-2.5 ">
                <div className="inline-flex h-[341px] w-[341px] flex-col items-end justify-start gap-2.5">
                    <div className="shrink grow basis-0 self-stretch rounded-full bg-barcelona"/>
                </div>
            </div>
            <div className="flex w-full flex-col gap-4 p-3 z-20 -mt-5">
                <Aikataulu/>
                <Aikataulu/>
            </div>
        </div>
    )
}
