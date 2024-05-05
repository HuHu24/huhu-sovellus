import { initFirebaseAdmin } from "@/firebaseAdmin"
import { getRemoteConfig } from "firebase-admin/remote-config"
import { Timetable } from "@/types/timetable"
import { User } from "@/types/user"

const getCafeTimetable = async () => {
  let timetable: Timetable | undefined = undefined

  try {
    const app = await initFirebaseAdmin()
    const remoteConfig: any = getRemoteConfig(app)
    const template = await remoteConfig.getTemplate()

    const keyword = "timetableCafe"

    timetable = await JSON.parse(
      template.parameters[`${keyword}`]?.defaultValue.value || ""
    )
  } catch (e) {
    console.error(e)
  }

  return timetable
}

export default getCafeTimetable
