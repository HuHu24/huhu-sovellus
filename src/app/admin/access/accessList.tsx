import React from "react"

function AccessList(props: {
  accessList: string[]
  accessListHeading: string
  accessListType: string
  removeAccess: (accessType: string, email: string) => Promise<void>
}) {
  if (props.accessList.length != 0) {
    return (
      <div className="z-10 flex w-full max-w-[500px] flex-col gap-2">
        <h2 className="flex h-12 items-center justify-center gap-2.5 rounded-[20px] bg-soul font-poppins text-2xl font-bold text-ateena">
          {props.accessListHeading}
        </h2>
        <>
          {props.accessList.map((email) => (
            <>
              <div className="place-items-top flex h-11 w-full rounded-[20px] bg-oslo p-2">
                <h1 className="font-poppins text-lg ">{email.toString()}</h1>
                <button
                  onClick={() =>
                    props.removeAccess(props.accessListType, email)
                  }
                  className="ml-auto"
                >
                  <span className="material-symbols-outlined text-2xl">
                    delete
                  </span>
                </button>
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
