import { initFirebaseAdmin } from "@/firebaseAdmin"
import { getRemoteConfig } from "firebase-admin/remote-config"
import { Timetable } from "@/types/timetable"
import { User } from "@/types/user"

const getTimetable = async (user: User | undefined) => {
  let timetable: Timetable | undefined = undefined

  if (user === null) {
    return timetable
  }

  try {
    const app = await initFirebaseAdmin()
    const remoteConfig: any = getRemoteConfig(app)
    const template = await remoteConfig.getTemplate()

    let keyword: String = "timetable"
    if ((user?.email && user.email != "") || user?.claims.job) {
      keyword += "Admin"
    } else {
      keyword += user?.claims.subcamp || ""
    }

    timetable = await JSON.parse(
      template.parameters[`${keyword}`]?.defaultValue.value || ""
    )
  } catch (e) {
    console.error(e)
  }

  return timetable
}

export default getTimetable
