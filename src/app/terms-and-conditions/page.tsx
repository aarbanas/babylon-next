import Footer from '@/components/ui/footer';

const TermsAndConditionsPage: React.FC = () => {
  // Terms and conditions page
  return (
    <>
      <div className="flex h-screen flex-col items-center px-80 pb-3 pt-10">
        <h1>PRIVOLA</h1>
        <h2 className="italic">za prikupljanje i obradu osobnih podataka</h2>

        <div className="mt-12 flex flex-col gap-3">
          <p>
            Prihvaćanjem ove Privole i ustupanjem Vaših osobnih podataka
            potvrđujete da ste istu pročitali i razumjeli te dopuštate
            trgovačkom društvu ____ (u daljnjem tekstu: Voditelj obrade) da te
            osobne podatke prikuplja, obrađuje i koristi u svrhu obavljanja
            svoje poslovne djelatnosti, odnosno posredovanja između korisnika i
            krajnjeg klijenta.
          </p>
          <p>
            Voditelj obrade će s Vašim osobnim podacima postupati sukladno Općoj
            uredbi o zaštiti podataka (EU GDPR) i Zakonu o provedbi opće uredbe
            o zaštiti podataka („Narodne novine“ broj 42/18) uz primjenu
            odgovarajućih organizacijskih i tehničkih mjera zaštite osobnih
            podataka od neovlaštenog pristupa, zlouporabe, otkrivanja, gubitka
            ili uništenja.
          </p>
          <p>
            Voditelj obrade štiti privatnost i čuva povjerljivost Vaših osobnih
            podataka te omogućava pristup i priopćavanje osobnih podataka samo
            onim svojim zaposlenicima kojima su oni potrebni radi provedbe
            njihovih radnih aktivnosti, a trećim osobama samo u slučajevima koji
            su propisani zakonom ili predstavljaju dio projektnih aktivnosti.
          </p>
          <p>
            Napominjemo da u svako doba, u potpunosti ili djelomice, bez naknade
            i objašnjenja možete odustati od dane privole i zatražiti prestanak
            aktivnosti obrade Vaših osobnih podataka.
          </p>
          <p>
            Opoziv privole možete podnijeti putem e-maila i to na adresu:
            _________
          </p>
          <div className="mt-10 flex flex-col gap-3">
            <p>
              Također, ako smatrate da su povrijeđena Vaša prava možete se
              direktno obratiti Agenciji za zaštitu osobnih podataka (AZOP,{' '}
              <a href="http://www.azop.hr">www.azop.hr</a>).
            </p>
            <p>
              PRIVOLA za prikupljanje i obradu osobnih podataka daje se za svrhu
              posredovanja između korisnika i krajnjeg klijenta s ciljem
              uspostavljanja poslovnog odnosa između istih.
            </p>
            <p>
              Rok čuvanja ovako prikupljenih podataka je do ispunjanja zakonskih
              zahtjeva o rokovima čuvanja relevantne dokumentacije.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditionsPage;
