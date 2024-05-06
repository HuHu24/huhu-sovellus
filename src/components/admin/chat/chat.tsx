import Link from "next/link"
import { Chat as ChatType } from "@/types/chat"

function Chat(props: { chat: ChatType }) {
  return (
    <Link href={`/admin/chat/${props.chat.id}`}>
      <div className="flex place-items-center">
        <h2 className="mr-auto truncate text-3xl">{props.chat.title}</h2>
        {!props.chat.hasBeenRead?.admin ? (
          <div className="flex h-6 place-items-center rounded-full bg-barcelona p-2">
            <p className="w-full text-center text-helsinki">Lukematta</p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex place-items-center">
        <p className="mr-1">
          {props.chat.latestMessage?.sender === "user" ? (
            <>Leiriläinen:</>
          ) : (
            <>Turva:</>
          )}
        </p>
        <p className="mr-auto w-[85%] truncate">{`${props.chat.latestMessage.body}`}</p>
      </div>
      <div className="my-2 h-0.5 w-full rounded-full bg-oslo" />
    </Link>
  )
}

export default Chat
