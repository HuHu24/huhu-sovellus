"use client"

import {FormEventHandler, useEffect, useRef, useState} from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef<any>();

  useEffect(() => {
    // Scroll to the bottom on component mount
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = (event: FormEventHandler<HTMLFormElement>) => {
    event.preventDefault();
    // Handle sending the message logic here

    // Scroll to the bottom after sending a message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    // Clear the message input
    setMessage("");
  };


  return (
    <div className="relative h-full w-full overflow-hidden bg-helsinki">
      <div
        className="bg-white inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-opacity-0 p-2.5">
        <div className="bg-white inline-flex items-center justify-between self-stretch bg-opacity-0">
          <div className="absolute h-12 w-12"></div>
          <div className="material-symbols-outlined z-10 text-[49px] text-ateena">
            <a href="./">arrow_left_alt</a>
          </div>
          <div className="z-10 font-opensauce text-4xl font-normal text-tokio ">
            Turvachat
          </div>
        </div>
      </div>
      <div ref={chatContainerRef} className="h-full flex w-full flex-col gap-4 overflow-auto p-3">
        <div className="w-full flex">
          <div className="w-2/4"></div>
          <div className="ml-auto p-2 text-helsinki text-lg bg-buenos_aires rounded-lg break-all">ajklajkls jklasjkl djkla
            ajklsd jklasdjklöas jkldajkl sdjklasd jklasj kldasjkld sjklfjkls jklfs klf
            jklsfjk lsdjklfjkls ddfjkls fsdjklf jklsdfj klsjkld jklsdfjk lsjklöf
          </div>
        </div>
        <div className="w-full flex">
          <div className="p-2 text-helsinki text-lg bg-barcelona rounded-lg break-all">ajklajkls jklasjkl djkla
            ajklsd jklasdjklöas jkldajkl sdjklasd jklasj kldasjkld sjklfjkls jklfs klf
            jklsfjk lsdjklfjkls ddfjkls fsdjklf jklsdfj klsjkld jklsdfjk lsjklöf
          </div>
          <div className="w-2/4"></div>
        </div>
        <div className="w-full flex">
          <div className="w-2/4"></div>
          <div className="ml-auto p-2 text-helsinki text-lg bg-buenos_aires rounded-lg break-all">ajklajkls jklasjkl djkla
            ajklsd jklasdjklöas jkldajkl sdjklasd jklasj kldasjkld sjklfjkls jklfs klf
            jklsfjk lsdjklfjkls ddfjkls fsdjklf jklsdfj klsjkld jklsdfjk lsjklöf
          </div>
        </div>
        <div className="w-full flex">
          <div className="p-2 text-helsinki text-lg bg-barcelona rounded-lg break-all">ajklajkls jklasjkl djkla
            ajklsd jklasdjklöas jkldajkl sdjklasd jklasj kldasjkld sjklfjkls jklfs klf
            jklsfjk lsdjklfjkls ddfjkls fsdjklf jklsdfj klsjkld jklsdfjk lsjklöf
          </div>
          <div className="w-2/4"></div>
        </div>
        <div className="w-full flex">
          <div className="w-2/4"></div>
          <div className="ml-auto p-2 text-helsinki text-lg bg-buenos_aires rounded-lg break-all">ajklajkls jklasjkl djkla
            ajklsd jklasdjklöas jkldajkl sdjklasd jklasj kldasjkld sjklfjkls jklfs klf
            jklsfjk lsdjklfjkls ddfjkls fsdjklf jklsdfj klsjkld jklsdfjk lsjklöf
          </div>
        </div>
        <div className="w-full flex">
          <div className="p-2 text-helsinki text-lg bg-barcelona rounded-lg break-all">ajklajkls jklasjkl djkla
            ajklsd jklasdjklöas jkldajkl sdjklasd jklasj kldasjkld sjklfjkls jklfs klf
            jklsfjk lsdjklfjkls ddfjkls fsdjklf jklsdfj klsjkld jklsdfjk lsjklöf
          </div>
          <div className="w-2/4"></div>
        </div>
        <div>
          <br/><br/><br/>
        </div>
      </div>
      <div className="h-[90px] w-screen fixed bottom-0 z-30 box-border flex bg-gray">
        <form className="flex p-3 place-items-center w-full h-full gap-5" onSubmit={handleSendMessage}>
          <textarea
            onChange={event => setMessage(event.target.value)}
            value={message}
            className="w-full h-full rounded-lg bg-barcelona p-2 text-xl text-helsinki"
            placeholder="Kirjoita viesti..."
            required={true}
          />
          <button>
            <span
              className="material-symbols-outlined h-[48px] w-full cursor-pointer text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]"
            >
              send
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}