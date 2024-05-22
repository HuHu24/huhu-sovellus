"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "@firebase/firestore"
import { db } from "@/firebase"
import { Message as MessageType } from "@/types/message"
import Message from "@/components/message"

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
    if (match) {
      setChatId(match[0].toString())
    }

    if (match) {
      localChatId = match[0] || ""
    }

    if (localChatId === "") {
      router.replace("/admin/chat")
    }

    const q = query(
      collection(db, "chats", localChatId, "messages"),
      orderBy("createdAt", "desc"),
      limit(20)
    )

    return onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: MessageType[] = []
      QuerySnapshot.forEach((doc) => {
        const data = doc.data() as MessageType
        fetchedMessages.push(data)
      })
      const sortedMessages = fetchedMessages.sort((a, b) => {
        return (a.createdAt < b.createdAt) as unknown as number
      })
      setMessages(sortedMessages)
    })
  }, [])

  useEffect(() => {
    // Scroll to the bottom on component mount
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [])

  const handleSendMessage = async (event: any) => {
    event.preventDefault()

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }

    try {
      updateDoc(doc(db, "chats", chatId), {
        hasBeenRead: {
          admin: true,
          user: false,
        },
        latestMessage: {
          body: message,
          sender: "safety",
        },
      })

      await addDoc(collection(db, "chats", chatId, "messages"), {
        createdAt: new Date(),
        body: message,
        sender: "admin",
      })

      setMessage("")
    } catch (e) {
      console.error(e)
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
        {messages?.toReversed().map((singleMessage) => (
          // eslint-disable-next-line react/jsx-key
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(e)
              }
            }}
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
