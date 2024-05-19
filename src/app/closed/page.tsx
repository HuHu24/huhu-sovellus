const Closed = () => {
  return (
    <div className="absolute w-screen h-screen z-50 bg-helsinki">
      <div className="p-5 flex-col h-full flex place-content-center">
        <img src={"/huhuymp.png"} alt={"HuHu logo"}/>
        <h1 className="text-center text-5xl font-bold mb-2">Sovellus ei ole vielä käytössä</h1>
        <p className="text-lg text-center">Voit silti ladata sovelluksen aloitusnäytölle kolmesta pisteestä ylänurkassa</p>
      </div>
    </div>
  )
}

export default Closed