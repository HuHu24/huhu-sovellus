function Message(props: {
  body: string
  sender: "user" | "safety"
  admin: boolean
}) {
  return (
    <>
      {props.admin ? (
        <>
          {props.sender === "user" ? (
            <div className="flex w-full">
              <div className="break-all rounded-lg bg-barcelona p-2 text-lg text-helsinki">
                {props.body}
              </div>
              <div className="w-2/4"></div>
            </div>
          ) : (
            <div className="flex w-full">
              <div className="w-2/4"></div>
              <div className="ml-auto break-all rounded-lg bg-buenos_aires p-2 text-lg text-helsinki">
                {props.body}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {props.sender === "user" ? (
            <div className="flex w-full">
              <div className="w-2/4"></div>
              <div className="ml-auto break-all rounded-lg bg-buenos_aires p-2 text-lg text-helsinki">
                {props.body}
              </div>
            </div>
          ) : (
            <div className="flex w-full">
              <div className="break-all rounded-lg bg-barcelona p-2 text-lg text-helsinki">
                {props.body}
              </div>
              <div className="w-2/4"></div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Message
