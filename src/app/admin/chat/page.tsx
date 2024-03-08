import Link from "next/link"
import Conversation from "@/app/admin/chat/conversation"
import { Suspense } from "react"

export default async function ChatMenu() {
  return (
    <>
      <div className="relative h-full w-full overflow-hidden bg-helsinki">
        <div className="inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-oslo p-2.5">
          <div className="inline-flex items-center justify-between self-stretch">
            <div className="absolute h-12 w-12"></div>
            <div className="material-symbols-outlined z-10 text-[49px] text-ateena">
              <a href="./">arrow_left_alt</a>
            </div>
            <div className="z-10 font-opensauce text-4xl font-normal text-ateena">
              Tekijäpaneeli
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-1 overflow-auto p-3">
          <Suspense>
            <Conversation
              id={" G1mo7TWE94RbfLYOd4RXdiJmgRv2 "}
              latestsMessage={
                "Tässä jotain diipa daapaa vai pitääkö edes olla mitään"
              }
              time={undefined}
              title={"---Chatin title tähän--"}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}
