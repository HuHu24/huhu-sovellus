import { Release } from "@/types/releases"
import formatDateTime from "@/utils/formatDateTime"
import Link from "next/link"

const HorizontalRelease = (props: {
  release: Release
  userSubcamp: string
}) => {
  let displayTime = ""
  if (props.release) {
    displayTime = formatDateTime(props.release.date, props.release.time)
  }
  if (props.release.hidden) {
    return null
  }
  if (
    props.release.timed &&
    new Date() < new Date(props.release.date + "T" + props.release.time)
  ) {
    return null
  }
  if (
    props.release.targetGroup == "Alaleiri" &&
    props.release.subcamp != props.userSubcamp
  ) {
    return null
  }

  return (
    <Link href={`/releases/${props.release.id}`} className="z-10">
      <div className="mr-4 flex flex-col">
        <div className="flex h-[150px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena">
          <img
            className="w-full object-cover"
            src={props.release.image}
            alt=""
          />
        </div>
        <div className="line-clamp-2 w-[180px] whitespace-normal font-poppins text-xl text-ateena shadow-helsinki text-shadow">
          {props.release.title}
        </div>
        <div className="line-clamp-2 w-[180px] overflow-hidden whitespace-normal break-all font-poppins font-normal text-ateena shadow-helsinki text-shadow">
          {props.release.content}
        </div>
        <div className="w-full overflow-hidden whitespace-normal font-opensauce text-sm font-normal text-ateena shadow-helsinki text-shadow">
          {displayTime}{" "}
        </div>
      </div>
    </Link>
  )
}

const VerticalRelease = (props: { release: Release; userSubcamp: string }) => {
  let displayTime = ""
  if (props.release) {
    displayTime = formatDateTime(props.release.date, props.release.time)
  }
  if (props.release.hidden) {
    return null
  }
  if (
    props.release.timed &&
    new Date() < new Date(props.release.date + "T" + props.release.time)
  ) {
    return null
  }
  if (
    props.release.targetGroup == "Alaleiri" &&
    props.release.subcamp != props.userSubcamp
  ) {
    return null
  }

  return (
    <Link href={`/releases/${props.release.id}`} className="z-10">
      <div className="flex items-center bg-ateena bg-opacity-0">
        <div className="flex h-[140px] w-[180px] justify-center overflow-hidden rounded-[20px] border-2 border-helsinki bg-ateena ">
          <img
            className="w-full object-cover"
            src={props.release.image}
            alt=""
          />
        </div>
        <div className="ml-[10px] flex w-[calc(100%-190px)] flex-col justify-center">
          <div className="text-overflow-ellipsis line-clamp-2 overflow-hidden font-poppins text-[18px] text-ateena shadow-helsinki text-shadow">
            {props.release.title}
          </div>
          <div className="break-all font-opensauce text-[15px] shadow-helsinki text-shadow">
            {displayTime}
            <br />
            {props.release.content}
            <br />
          </div>
        </div>
      </div>
    </Link>
  )
}

const Releases = (props: {
  direction: "vertical" | "horizontal"
  releases: Release[]
  userSubcamp: string
}) => {
  return (
    <>
      {props.direction === "vertical" ? (
        <div className="w-full overflow-y-auto">
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {props.releases.map((release: Release) => (
              <VerticalRelease
                key={release.id}
                release={release}
                userSubcamp={props.userSubcamp}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex overflow-x-auto">
          {props.releases.map((release: Release) => (
            <HorizontalRelease
              key={release.id}
              release={release}
              userSubcamp={props.userSubcamp}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Releases
