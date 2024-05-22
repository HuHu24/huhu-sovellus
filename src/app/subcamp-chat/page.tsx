"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { onAuthStateChanged } from "@firebase/auth"
import { auth, db } from "@/firebase"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "@firebase/firestore"
import { Message as MessageType } from "@/types/message"
import Message from "@/components/message"

export default function SubcampChat() {
  const [messageBody, setMessageBody] = useState("")
  const [messages, setMessages] = useState<MessageType[]>()
  const [userUid, setUserUid] = useState("")
  const chatContainerRef = useRef<any>()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid)
        const q = query(
          collection(db, "subcamp-chats", user.uid, "messages"),
          orderBy("createdAt", "desc"),
          limit(100)
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
      } else {
        setUserUid("")
      }
    })

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [])

  const handleSendMessage = async (
    event: FormEvent<HTMLFormElement> | undefined
  ) => {
    if (event) {
      event.preventDefault()
    }

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }

    try {
      let title = ""
      const data = await getDoc(doc(db, "subcamp-chats", userUid))
      if (!data.exists()) {
        title = prompt("Lisää keskustelun aihe") || ""

        let subcamp = ""
        if (typeof window !== "undefined") {
          subcamp = localStorage.getItem("subcamp") || ""
        }

        await setDoc(doc(db, "subcamp-chats", userUid), {
          hasBeenRead: {
            admin: false,
            user: true,
          },
          latestMessage: {
            body: messageBody,
            sender: "user",
          },
          title: title,
          subcamp: subcamp,
        })
      } else {
        updateDoc(doc(db, "subcamp-chats", userUid), {
          hasBeenRead: {
            admin: false,
            user: true,
          },
          latestMessage: {
            body: messageBody,
            sender: "user",
          },
        })
      }

      await addDoc(collection(db, "subcamp-chats", userUid, "messages"), {
        createdAt: new Date(),
        body: messageBody,
        sender: "user",
      })

      setMessageBody("")
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
            Alaleirichat
          </div>
        </div>
      </div>
      <div
        ref={chatContainerRef}
        className="flex h-full w-full flex-col gap-4 overflow-auto p-3"
      >
        <>
          {messages && messages.length > 0 ? (
            <>
              {messages.toReversed().map((singleMessage) => (
                // eslint-disable-next-line react/jsx-key
                <Message
                  body={singleMessage.body}
                  sender={singleMessage.sender}
                  admin={false}
                />
              ))}
            </>
          ) : (
            <>
              <h1 className="m-auto text-center text-3xl text-ateena">
                Aloita keskustelu aleleirimestarisi kanssa lähettämällä
                ensimmäinen viesti
              </h1>
            </>
          )}
        </>
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
            onChange={(event) => setMessageBody(event.target.value)}
            value={messageBody}
            className="h-full w-full resize-none rounded-lg bg-barcelona p-2 text-xl text-helsinki"
            placeholder="Kirjoita viesti..."
            required={true}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(undefined)
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
