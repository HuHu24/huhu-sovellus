import {loginWithEmailAndPassword} from "@/firebase";

const ReportToUpkeep = () => {
  return (
    <div className="m-3 rounded-xl bg-oslo p-2">
      <h1 className="text-2xl font-bold">Ilmoita puutteesta Huollolle</h1>
      <textarea className="w-full rounded-lg bg-barcelona p-1 text-xl text-helsinki my-3" placeholder="Kerro minkälainen puute on kyseessä ja missä puute sijaitsee..."/>
      <div className="flex place-content-center w-full">
        <button className="rounded-lg bg-soul p-1 px-5 text-xl">
          Kirjaudu sisään
        </button>
      </div>
    </div>
  )
}

export default ReportToUpkeep