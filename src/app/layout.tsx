import type { Metadata } from "next"
import "./globals.css"
import localFont from "next/font/local"
import Navbar from "../components/navbar/navbar"

const poppins = localFont({
  src: "../../public/fonts/Poppins-Bold.ttf",
  display: "swap",
  variable: "--font-poppins",
})
const opensauce = localFont({
  src: "../../public/fonts/OpenSauceOne-Regular.ttf",
  variable: "--font-opensauce",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Valitse alaleiri",
  description: "",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${opensauce.variable} ${poppins.variable}`}>
        {children}
        <Navbar />
      </body>
    </html>
  )
}
