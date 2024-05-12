import Releases from "@/components/releases"
import DaysTimetable from "@/components/daysTimetable"
import getTimetable from "@/utils/getTimetable"
import { cookies } from "next/headers"
import getReleases from "@/utils/getReleases"
import { Timetable } from "@/types/timetable"
import { Release } from "@/types/releases"
import getUser from "@/utils/getUser"
import Events from "@/components/events"
import ReportToUpkeep from "@/components/reportToUpkeep"

export default async function Home() {
  let timetable: Timetable | undefined
  let releases: Release[] = []

  const user = await getUser(cookies().get("session")?.value || "")
  const subcamp = user?.claims.subcamp || ""

  await Promise.all([
    getTimetable(user).then((value) => {
      timetable = value || undefined
    }),
    getReleases().then((value) => {
      releases = value
    }),
  ])

  return (
    <div className="relative h-full w-full overflow-x-hidden overflow-y-scroll bg-helsinki">
      <div className="flex w-full flex-col gap-4 p-3">
        <Releases
          direction={"horizontal"}
          userSubcamp={subcamp}
          releases={releases}
        />
        <>
          {timetable && timetable.days[0] ? (
            <>
              <DaysTimetable
                date={timetable.days[0].date}
                events={timetable.days[0].events}
              />
              <Events />
            </>
          ) : (
            <DaysTimetable date="Ei aikataulua" events={[]} />
          )}
        </>
      </div>
      <div className="m-3 rounded-xl bg-oslo p-2">
        <h1 className="text-2xl font-bold">Turvallisuuden pikaohje</h1>
        <p>
          Jos sinuun sattuu fyysisesti, soita EA-päivystyspuhelimeen (041 727
          1075).
        </p>
        <br />
        <p>
          Jos sinuun sattuu henkisesti, soita, txt tai laita Whatsappia Henkisen
          turvan päivystyspuhelimeen (041 727 1074).
        </p>
        <br />
        <p>
          Jos kumpikaan näistä ei vastaa tilannettasi, mutta tarvitset muuta
          apua tai yhteyden Turvallisuuteen, soita Turvan päivystyspuhelimeen
          (041 727 8125).
        </p>
        <br />
        <p className="font-bold">
          Akuuteissa hätätilanteissa, soita 112. Jonka jälkeen soita
          välittömästi Turvan päivystyspuhelimeen (041 727 8125).
        </p>
      </div>
      <ReportToUpkeep />
    </div>
  )
}
