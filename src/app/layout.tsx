import { Metadata } from "next"
import "./globals.css"
import localFont from "next/font/local"

const poppins = localFont({
  src: "../../public/fonts/Poppins-Regular.ttf",
  display: "swap",
  variable: "--font-poppins",
})
const opensauce = localFont({
  src: "../../public/fonts/OpenSauceOne-Regular.ttf",
  variable: "--font-opensauce",
  display: "swap",
})

export const metadata: Metadata = {
  title: "HuHu-sovellus",
  description: "Lounais-Suomen Partiopiirin HuHu24 leirisovellus",
  manifest: "/manifest.json",
  applicationName: "HuHu-sovellus",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fi">
      <body
        className={`${opensauce.variable} ${poppins.variable} h-screen bg-helsinki`}
      >
        {children}
      </body>
    </html>
  )
}
