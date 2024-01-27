export default async function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="absolute z-30 flex h-screen w-full place-content-center place-items-center overflow-hidden break-all bg-helsinki text-center font-poppins text-ateena">
      <div className="mx-4 my-auto flex w-full max-w-[500px] flex-col items-center justify-between gap-3 rounded-[20px] bg-oslo p-4">
        {children}
      </div>
    </div>
  )
}
