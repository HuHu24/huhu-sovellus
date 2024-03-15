"use client"

import { FormEventHandler, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { addDoc, collection, getDocs } from "@firebase/firestore"
import { db } from "@/firebase"
import { Message as MessageType } from "@/types/message"
import Message from "@/components/chat/message"

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const [messages, setMessages] = useState<MessageType[]>()
  const [chatId, setChatId] = useState("")
  const [message, setMessage] = useState("")
  const chatContainerRef = useRef<any>()

  useEffect(() => {
    const match = pathname.match("[^/]*$")
    let localChatId = ""
    console.log(match[0])
    if (match) {
      setChatId(match[0].toString())
    }

    localChatId = match[0] || ""

    if (localChatId === "") {
      console.log(chatId)
      router.replace("/admin/chat")
    }

    getDocs(collection(db, "chats", "G1mo7TWE94RbfLYOd4RXdiJmgRv2", "messages"))
      .then((data) => {
        const filteredMessages = data.docs.map((doc) =>
          doc.data()
        ) as MessageType[]
        setMessages(filteredMessages)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    // Scroll to the bottom on component mount
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [])

  const handleSendMessage = async (
    event: FormEventHandler<HTMLFormElement>
  ) => {
    event.preventDefault()
    // Handle sending the message logic here

    // Scroll to the bottom after sending a message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }

    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        sentTime: new Date(),
        body: message,
        sender: "admin",
      })

      setMessage("")
    } catch (e) {
      console.log(e)
      alert("Error")
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-helsinki">
      <div className="bg-white inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-opacity-0 p-2.5">
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
      <div
        ref={chatContainerRef}
        className="flex h-full w-full flex-col gap-4 overflow-auto p-3"
      >
        {messages?.map((singleMessage) => (
          <Message
            body={singleMessage.body}
            sender={singleMessage.sender}
            admin={true}
          />
        ))}
        <div>
          <br />
          <br />
          <br />
        </div>
      </div>
      <div className="fixed bottom-0 z-30 box-border flex h-[90px] w-screen bg-gray">
        <form
          className="flex h-full w-full place-items-center gap-5 p-3"
          onSubmit={handleSendMessage}
        >
          <textarea
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            className="h-full w-full rounded-lg bg-barcelona p-2 text-xl text-helsinki"
            placeholder="Kirjoita viesti..."
            required={true}
          />
          <button>
            <span className="material-symbols-outlined h-[48px] w-full cursor-pointer text-[48px] text-tokio smallPhone:h-[64px] smallPhone:text-[64px]">
              send
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}
