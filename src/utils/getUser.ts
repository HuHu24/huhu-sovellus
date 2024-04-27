import { env } from "@/env"
import { User } from "@/types/user"

const getUser = async (session: string) => {
  let data: User | undefined = undefined

  try {
    const result = await fetch(`${env.NEXT_PUBLIC_URL}/api/auth`, {
      headers: {
        Cookie: `session=${session}`,
      },
    })

    data = await result.json()
  } catch (e) {
    console.error(e)
  }

  return data
}

export default getUser
