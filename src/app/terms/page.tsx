import Link from "next/link"

export default function Map() {
  return (
    <>
      <div className="inline-flex h-[68px] w-full flex-col items-start justify-start gap-2.5 bg-oslo p-2.5">
        <div className="inline-flex items-center justify-between self-stretch">
          <div className="absolute h-12 w-12"></div>
          <div className="material-symbols-outlined z-10 text-[49px] text-ateena">
            <Link href="/">arrow_left_alt</Link>
          </div>
          <div className="z-10 font-opensauce text-4xl font-normal text-ateena">
            Käyttöehdot
          </div>
        </div>
      </div>
      <div className="p-3">
        <p>
          Nämä käyttöehdot tehdään käyttäjän (&quot;Käyttäjä&quot;) ja
          HuHu-sovellus (&quot;Sovellus&quot;) välillä. Tämä Sopimus ohjaa
          HuHu-sovelluksen ja siihen liittyvien palveluiden käyttöä.{" "}
        </p>
        <br />
        <ol className="ml-5 list-decimal">
          <li>
            <strong>Lisenssi</strong>
            <br />
            <br />
            1.1 Lisenssin myöntäminen: Lounais-Suomen Partiopiiri ry
            (&quot;Rekisterin pitäjä&quot;) (2197948-1) myöntää käyttäjälle
            rajoitetun, ei-yksinomaisen, siirrettävissä olemattoman,
            peruutettavissa olevan lisenssin käyttää HuHu-sovellusta ainoastaan
            henkilökohtaisiin, ei-kaupallisiin tarkoituksiin.
            <br />
            <br />
            1.2 Rajoitukset: Käyttäjä ei saa:
            <ul className="ml-5 list-disc">
              <li>Muokata, sovittaa mitään osaa HuHu-sovelluksesta.</li>
              <li>
                Käyttää HuHu-sovellusta lainvastaiseen tai luvattomaan
                tarkoitukseen.
              </li>
              <li>
                Lähettää viruksia tai haitallista koodia HuHu-sovelluksen
                kautta.
              </li>
              <li>
                Yrittää saada luvatonta pääsyä HuHu-sovellukseen tai siihen
                liittyviin järjestelmiin.
              </li>
            </ul>
          </li>
          <br />
          <li>
            <strong>Käyttäjän Sisältö</strong>
            <br />
            <br />
            2.1 Omistusoikeus: Käyttäjä säilyttää omistusoikeuden kaikkeen
            siihen lataamaansa tai syöttämäänsä sisältöön (&quot;Käyttäjän
            Sisältö&quot;).
            <br />
            <br />
            2.2 Lisenssi Rekisterin pitäjälle: Lataamalla ja käyttämällä
            sovellusta, Käyttäjä myöntää Lounais-Suomen Partiopiiri ry:lle
            oikeuden käyttää käyttäjän sisältöä HuHu -sovelluksen kehittämiseen.
          </li>
          <br />
          <li>
            <strong>Yksityisyys</strong>
            <br />
            <br />
            3.1 Tietojen Kerääminen: Rekisterin pitäjä ja tietojen käsittelijä
            Google LLC voivat kerätä ja käyttää henkilökohtaisia tietoja kuten
            on kuvattu Yksityisyydensuojakäytännössä.
            <br />
            <br />
            3.2 Evästeet: HuHu-sovellus voi käyttää evästeitä käyttäjäkokemuksen
            parantamiseksi. Käyttäjät voivat säätää selaimensa asetuksia
            evästeiden hylkäämiseksi.
          </li>
          <br />
          <li>
            <strong>Immateriaalioikeudet</strong>
            <br />
            <br />
            4.1 Omistusoikeus: Lounais-Suomen Partiopiiri ry säilyttää kaikki
            immateriaalioikeudet liittyen HuHu-sovellukseen.
          </li>
          <br />
          <li>
            <strong>Päättäminen</strong>
            <br />
            <br />
            5.1 Käyttäjän Päättäminen: Käyttäjä voi päättää HuHu-sovelluksen
            käytön milloin tahansa.
            <br />
            <br />
            5.2 Rekisterin pitäjän Päättäminen: Rekisterin pitäjällä on oikeus
            keskeyttää tai lopettaa Käyttäjän pääsy HuHu-sovellukseen mistä
            tahansa syystä ilman ennakkoilmoitusta.
          </li>
          <br />
          <li>
            <strong>Vastuuvapauslauseke</strong>
            <br />
            <br />
            6.1 Ei Takuuta: Palvelu tarjotaan &quot;sellaisenaan&quot; ilman
            mitään takuuta, suoraa tai epäsuoraa. Rekisterin pitäjä ei takaa,
            että HuHu-sovellus on virheetön, keskeytymätön tai haittaohjelmista
            vapaa.
          </li>
          <br />
          <li>
            <strong>Vastuunrajoitus</strong>
            <br />
            <br />
            7.1 Vahingonkorvausten Poissulkeminen: Rekisterin pitäjä ei missään
            tapauksessa ole vastuussa välillisistä, satunnaisista, erityisistä,
            seuraamuksellisista tai rangaistusluontoisista vahingoista.
          </li>
          <br />
          <li>
            <strong>Vakuutena Olo</strong>
            <br />
            <br />
            Käyttäjän Vastuu: Käyttäjä sitoutuu korvaamaan ja vapauttamaan
            Rekisterin pitäjän vaatimuksista, tappioista tai vahingoista, jotka
            johtuvat hänen HuHu-sovelluksen käytöstään tai tämän Sopimuksen
            rikkomisesta.
          </li>
          <br />
          <li>
            <strong>Sovellettava Laki</strong>
            <br />
            <br />
            9.1 Lainvalinta: Tätä Sopimusta hallitsee ja tulkkaa Suomen
            lainsäädäntö.
          </li>
          <br />
          <li>
            <strong>Muutokset</strong>
            <br />
            <br />
            10.1 Muutokset Sopimukseen: Rekisterin pitäjä voi päivittää tätä
            Sopimusta milloin tahansa. Käyttäjän jatkunut HuHu-sovelluksen
            käyttö muutosten jälkeen merkitsee hyväksyntää uudistetulle
            Sopimukselle.
          </li>
        </ol>
        <br />
        Käyttäessään HuHu-sovellusta Käyttäjä myöntää lukeneensa, ymmärtäneensä
        ja hyväksyvänsä olevansa sitoutunut tähän Sopimukseen. Mikäli Käyttäjä
        ei hyväksy ehtoja, hänen tulee pidättäytyä HuHu-sovelluksen käytöstä.
        <br />
        <br />
        [Lounais-Suomen Partiopiiri ry] [29.4.2024]
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  )
}
