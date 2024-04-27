import Releases from "@/components/releases"
import DaysTimetable from "@/components/daysTimetable"
import getTimetable from "@/utils/getTimetable"
import { cookies } from "next/headers"
import getReleases from "@/utils/getReleases"
import { Timetable } from "@/types/timetable"
import { Release } from "@/types/releases"
import getUser from "@/utils/getUser"

export default async function Home() {
  let timetable: Timetable | null = null
  let releases: Release[] = []

  const user = await getUser(cookies().get("session")?.value || "")
  const subcamp = user.claims.subcamp || ""

  await Promise.all([
    getTimetable(user).then((value) => {
      timetable = value.timetable
    }),
    getReleases().then((value) => {
      releases = value
    }),
  ])

  return (
    <div className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-helsinki">
      <div className="absolute -right-40 -top-40 p-2.5">
        <div className="inline-flex h-[369px] w-[360px] items-end justify-start gap-2.5">
          <div className="shrink grow basis-0 self-stretch rounded-full bg-barcelona" />
        </div>
      </div>
      <div className="fixed -bottom-40 -left-44 p-2.5 ">
        <div className="inline-flex h-[341px] w-[341px] flex-col items-end justify-start gap-2.5">
          <div className="shrink grow basis-0 self-stretch rounded-full bg-soul" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 p-3">
        <Releases
          direction={"horizontal"}
          userSubcamp={subcamp}
          releases={releases}
        />
        <>
          {timetable ? (
            <DaysTimetable
              date={timetable.days[0].date}
              events={timetable.days[0].events}
            />
          ) : (
            <DaysTimetable date="Ei aikataulua" events={[]} />
          )}
        </>
      </div>
    </div>
  )
}
