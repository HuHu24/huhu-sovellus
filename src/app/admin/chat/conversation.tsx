import Link from "next/link"

function Conversation(props: {
  id: string
  latestsMessage: string
  title: string
  time: Date | undefined
}) {
  return (
    <Link href={`/admin/chat/${props.id}`}>
      <div className="flex place-items-center">
        <h2 className="mr-auto text-3xl">{props.title}</h2>
        <p className="text-lg">xx:xx</p>
      </div>
      <div className="flex place-items-center">
        <p className="mr-auto w-[85%] truncate">{props.latestsMessage}</p>
        <div className="flex h-6 place-items-center rounded-lg bg-barcelona p-1">
          <p className="w-full text-center text-helsinki">1</p>
        </div>
      </div>
      <div className="my-2 h-0.5 w-full rounded-full bg-oslo" />
    </Link>
  )
}

export default Conversation
