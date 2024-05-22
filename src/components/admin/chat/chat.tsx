import Link from "next/link"
import { SafetyChat } from "@/types/safetyChat"
import { SubcampChat } from "@/types/subcampChat"

function Chat(props: {
  chat: SafetyChat | SubcampChat
  type: "safety" | "subcamp"
}) {
  return (
    <Link
      href={`/admin/${props.type === "subcamp" ? "subcamp-" : ""}chat/${
        props.chat.id
      }`}
    >
      <div className="flex place-items-center">
        <h2 className="mr-auto truncate text-3xl">
          {props.type === "subcamp" && "subcamp" in props.chat
            ? props.chat.subcamp + " - " + props.chat.title
            : props.chat.title}
        </h2>
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
            <>{props.type === "safety" ? <>Turva:</> : <>Alaleirimestari:</>}</>
          )}
        </p>
        <p className="mr-auto w-[85%] truncate">{`${props.chat.latestMessage.body}`}</p>
      </div>
      <div className="my-2 h-0.5 w-full rounded-full bg-oslo" />
    </Link>
  )
}

export default Chat
