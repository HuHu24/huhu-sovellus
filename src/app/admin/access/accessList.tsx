import React from "react"

function AccessList(props: {
  accessList: [{ email: string; uid: string }] | []
  accessListHeading: string
  accessListType: string
}) {
  async function removeAccess(accessType: string, email: string) {
    console.log(accessType)
    if (!["admin", "subcamp", "safety"].includes(accessType) || email == "") {
      alert("Tarkista sähköposti ja oikeustyyppi")
      return
    }

    try {
      const result = await fetch(
        "http://localhost:3000/huhu-sovellus/api/auth/claims",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: accessType, email: email }),
        }
      )

      alert("Removed permissions")
    } catch (e) {
      console.error("Selecting subcamp failed", e)
    }
  }

  if (props.accessList.length != 0) {
    return (
      <div className="z-10 flex w-full max-w-[500px] flex-col gap-2">
        <h2 className="flex h-12 items-center justify-center gap-2.5 rounded-[20px] bg-soul font-poppins text-2xl font-bold text-ateena">
          {props.accessListHeading}
        </h2>
        <>
          {props.accessList.map((user) => (
            <>
              <div className="place-items-top flex h-11 w-full rounded-[20px] bg-oslo p-2">
                <h1 className="font-poppins text-lg ">{user.email}</h1>
                <button
                  onClick={() => removeAccess(props.accessListType, user.email)}
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
