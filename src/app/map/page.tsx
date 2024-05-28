export default function Map() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <img
          src="/map.png"
          alt="HuHun leirialueen kartta"
          className="h-auto w-full"
          style={{ touchAction: "manipulation" }} // Ensure proper touch handling
        />
      </div>
    </div>
  )
}
