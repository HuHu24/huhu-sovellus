import Link from "next/link";

const tiedot = {
    otsikko: "Ruoka peruttu",
    teksti: "Joo safka ei oo hoitanut hommaansa niin kuollaan nälkään. Syy kissan karv...",
    kuva: "/public/huhuymp.png"
}

const Tiedote = () => {
  return (
    <Link href={"/"} className="z-10">
      <div className="mr-4 flex flex-col">
        <div className="w-[180px] h-[150px] bg-ateena rounded-[20px] border-2 border-helsinki flex justify-center overflow-hidden">
          <img className="h-full" src="huhuymp.png"/>
        </div>
        <div
          className="w-[180px] text-ateena font-normal font-poppins whitespace-normal">
          {tiedot.otsikko}
        </div>
        <div
          className="text-ateena w-full h-[76px] text-sm font-normal font-opensauce whitespace-normal overflow-hidden">
          {tiedot.teksti}  sdf sdf sdklöfjklös klösjkldfjklsdjkl jklsfjkls sdf sdf sjksdjfsjkldfsjd sdfsdf sdfsd sdfsdfsdf
        </div>
      </div>
    </Link>
  );
};

const Tiedotteet = () => {
  return (
    <div className="flex overflow-x-auto">
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
      <Tiedote/>
    </div>
  );
}

export default Tiedotteet;
