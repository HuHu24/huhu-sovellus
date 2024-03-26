import { Metadata } from "next"
import "./globals.css"
import localFont from "next/font/local"
import Navbar from "../components/navbar"

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
  title: "HuHu24 leirisovellus",
  description: 'HuHu 2024 partioleirin puhelinsovellus"',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${opensauce.variable} ${poppins.variable} h-[calc(100vh-70px)] bg-helsinki`}
      >
        {children}
        <Navbar />
      </body>
    </html>
  )
}
