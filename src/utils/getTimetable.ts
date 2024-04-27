import { initFirebaseAdmin } from "@/firebaseAdmin"
import { getRemoteConfig } from "firebase-admin/remote-config"
import { env } from "@/env"
import { Timetable } from "@/types/timetable"

const getTimetable = async (session: string) => {
  let timetable: Timetable | null = null
  let subcamp = ""

  try {
    const app = await initFirebaseAdmin()
    const remoteConfig = getRemoteConfig(app)
    const template = await remoteConfig.getTemplate()

    const result = await fetch(`${env.NEXT_PUBLIC_URL}/api/auth`, {
      headers: {
        Cookie: `session=${session}`,
      },
    })

    const parsedData = await result.json()
    console.log(parsedData)

    let keyword: String = "timetable"
    if (parsedData.email && parsedData.email != "") {
      keyword += "Admin"
    } else {
      keyword += parsedData.claims.subcamp
      subcamp = parsedData.claims.subcamp
    }

    timetable = await JSON.parse(
      template.parameters[`${keyword}`].defaultValue.value
    )
  } catch (e) {
    console.error(e)
  }

  return {
    subcamp: subcamp,
    timetable: timetable,
  }
}

export default getTimetable
