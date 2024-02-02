import React from "react"

function AccessList(props: {
  accessList: [{ email: string; uid: string }] | []
  accessListHeading: string
}) {
  if (props.accessList.length != 0) {
    return (
      <div className="z-10 flex w-full max-w-[500px] flex-col gap-2">
        <h2 className="flex h-12 items-center justify-center gap-2.5 rounded-[20px] bg-soul font-poppins text-2xl font-bold text-ateena">
          {props.accessListHeading}
        </h2>
        <>
          {props.accessList.map((admin) => (
            <>
              <div className="place-items-top flex h-11 w-full rounded-[20px] bg-oslo p-2">
                <h3 className="font-poppins text-lg ">{admin.email}</h3>
              </div>
            </>
          ))}
        </>
      </div>
    )
  }

  return <></>
}

export default AccessList
