import { initFirebaseAdmin } from "@/firebaseAdmin"
import { getRemoteConfig, RemoteConfig } from "firebase-admin/remote-config"
import { Timetable } from "@/types/timetable"
import { User } from "@/types/user"

const getTimetable = async (user: User | null) => {
  let timetable: Timetable | null = null

  if (user === null) {
    return timetable
  }

  try {
    const app = await initFirebaseAdmin()
    const remoteConfig = getRemoteConfig(app)
    const template = await remoteConfig.getTemplate()

    let keyword: String = "timetable"
    if (user.email && user.email != "") {
      keyword += "Admin"
    } else {
      keyword += user.claims.subcamp
    }

    timetable = await JSON.parse(
      template.parameters[`${keyword}`].defaultValue.value
    )
  } catch (e) {
    console.error(e)
  }

  return {
    timetable: timetable,
  }
}

export default getTimetable
