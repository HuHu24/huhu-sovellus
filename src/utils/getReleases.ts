import { firestore } from "firebase-admin"
import { Release } from "@/types/releases"

const getReleases = async () => {
  const releases: Release[] = []

  const releasesSnapshot = await firestore().collection("releases").get()
  releasesSnapshot.docs.map((doc) => {
    releases.push({ ...doc.data(), id: doc.id } as Release)
  })

  return releases
}

export default getReleases
