"use client"
import React, { useEffect, useState } from 'react';
import Chat from "@/components/admin/chat/chat"
import {getChats} from "@/firebase"
import { Chat as chatType } from "@/types/chat";
export default function ChatMenu() {
  const [data, setData] = useState<chatType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getChats();
      setData(result);
    };

    fetchData();
  }, []);

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
            {data.map((chat) => {
              // eslint-disable-next-line react/jsx-key
              return <Chat chat={chat} />
            })}
          </div>
        </div>
      </>
  )
}