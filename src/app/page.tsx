import DaysTimetable from "@/components/daysTimetable"
import Releases from "@/components/release/release_frontpage"
export default function Home() {

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
        <Releases />
        {/* // TODO Keksi miten näytät etusivulla */}
        {/* <DaysTimetable date={""} events={[]} /> */}
      </div>
    </div>
  )
}
