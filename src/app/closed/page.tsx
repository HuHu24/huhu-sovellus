const Closed = () => {
  return (
    <div className="absolute z-50 h-screen w-screen bg-helsinki">
      <div className="flex h-full flex-col place-content-center p-5">
        <img src={"/huhuymp.png"} alt={"HuHu logo"} />
        <h1 className="mb-2 text-center text-5xl font-bold">
          Sovellus ei ole vielä käytössä
        </h1>
        <p className="text-center text-lg">
          Voit silti ladata sovelluksen aloitusnäytölle kolmesta pisteestä
          ylänurkassa
        </p>
      </div>
    </div>
  )
}

export default Closed
