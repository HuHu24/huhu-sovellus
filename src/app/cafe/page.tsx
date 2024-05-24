import DaysTimetable from "@/components/daysTimetable"
import getCafeTimetable from "@/utils/getCafeTimetable"
import Events from "@/components/events"
import React from "react"

export default async function Cafe() {
  const timetable = await getCafeTimetable()

  return (
    <div className="relative h-full w-full overflow-hidden bg-helsinki">
      <div className="bg-white inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-opacity-0 p-2.5">
        <div className="bg-white inline-flex items-center justify-between self-stretch bg-opacity-0">
          <div className="absolute h-12 w-12"></div>
          <div className="material-symbols-outlined z-10 text-[49px] text-helsinki">
            <a href="">arrow_left_alt</a>
          </div>
          <div className="z-10 font-opensauce text-4xl font-normal text-tokio ">
            Kahvila
          </div>
        </div>
      </div>
      <div className="absolute -left-44 -top-44 z-0 p-2.5">
        <div className="z-0 inline-flex h-[369px] w-[360px] items-end justify-start gap-2.5">
          <div className="z-0 shrink grow basis-0 self-stretch rounded-full bg-buenos_aires" />
        </div>
      </div>
      <div className="absolute -bottom-48 -right-48 p-2.5 ">
        <div className="inline-flex h-[341px] w-[341px] flex-col items-end justify-start gap-2.5">
          <div className="shrink grow basis-0 self-stretch rounded-full bg-barcelona" />
        </div>
      </div>
      <div className=" z-20 -mt-3 flex h-full w-full flex-col gap-4 overflow-auto p-3">
        <div className="z-10 rounded-xl bg-oslo p-2">
          <h1 className="font-poppins text-xl">Kahvilan hinnasto:</h1>
          <table className="w-full text-left font-opensauce text-lg">
            <tbody>
              <tr>
                <th>Tuote</th>
                <th>Hinta</th>
              </tr>
              <tr>
                <td>------</td>
                <td>------</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Events />
        {timetable ? (
          timetable.days.map((day, key) => (
            <DaysTimetable key={key} date={day.date} events={day.events} />
          ))
        ) : (
          <DaysTimetable date="Ei aikataulua" events={[]} />
        )}
        <p>
          <br />
          <br />
        </p>
      </div>
    </div>
  )
}
