import { initFirebaseAdmin } from "@/firebaseAdmin"
import { getRemoteConfig } from "firebase-admin/remote-config"
import CafePrices, { CafeProduct } from "@/types/cafeProduct"

const getCafeProducts = async (): Promise<
  [CafePrices | undefined, string[]]
> => {
  let cafeTitles: string[] = []
  let cafeProducts: CafePrices | undefined = undefined

  try {
    const app = await initFirebaseAdmin()
    const remoteConfig: any = getRemoteConfig(app)
    const template = await remoteConfig.getTemplate()
    const { titles, ...products } = await JSON.parse(
      template.parameters["cafeProducts"]?.defaultValue.value || ""
    )
    cafeTitles = titles
    cafeProducts = products
  } catch (e) {
    console.error(e)
  }

  return [cafeProducts, cafeTitles]
}

export default getCafeProducts
