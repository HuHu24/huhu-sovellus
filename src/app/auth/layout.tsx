export default async function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full place-content-center place-items-center text-center font-poppins">
      <div className="mx-4 my-auto flex w-full max-w-[500px] flex-col place-items-center gap-3 rounded-[20px] bg-oslo p-4">
        {children}
      </div>
    </div>
  )
}
