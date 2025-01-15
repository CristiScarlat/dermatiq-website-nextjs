import styles from "../styles/Dermalinfusion.module.css";
import {FcQuestions} from "react-icons/fc";

const Dermalinfusion = () => {

  return (
    <div className="p-3">
      <h2 className={styles.title}>Dermalinfusion</h2>
      <div className={styles.titleImage}>
        <img src="/dermalinfusion/sp-slide-11.jpg"/>
      </div>
      <section className={styles.section}>
        <article>

          <ul>
            <li>
              <p>
                <span className={styles.strong}>Dermalinfusion®</span> este un tratament dermatologic patentat,
                non-invaziv si cu o actiune simultana de exfoliere,
                extractie si de infuzare profunda a solutiilor specifice afectiunilor vizate. Este singurul tratament de
                specialitate, cu
                o dozare optima a serului pentru rezultate imediate si de lunga durata.
                Tratamentul este ideal pentru toate tipurile de piele si nu necesita timp de recuperare pentru pacient.
              </p>
            </li>
          </ul>
        </article>

        <article>
          <h4 className={styles["text-invert"]} style={{marginBottom: '1.5rem'}}>SOLUTIA RAPIDA SI CU REZULTATE DE LUNGA
            DURATA
            PENTRU IMBUNATATIREA SI TRATAREA AFECTIUNILOR PIELII
          </h4>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
            <img src="/dermalinfusion/dermalinfusion_aparat.jpg" className={styles.imgRegular}/>
            <ul className={styles.listStyle}>
              <li>
                Hiperpigmentari: Melasma,
                Lentigo , Hiperpigmentari post-
                inflamatorii
              </li>
              <li>Acnee</li>
              <li>Linii si riduri fine</li>
              <li>Ten matur</li>
              <li>Ten deshitratat</li>
              <li>Pori mariti, ten gras</li>
              <li>Piele aspra</li>
            </ul>
          </div>
        </article>

        <article>
          <h4 className={styles["text-invert"]} style={{marginBottom: '1.5rem'}}>BENEFICIILE DERMALINFUSION</h4>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
            <img src="/dermalinfusion/dermal_1080.jpg" className={styles.imgRegular}/>
          <ul>
            <li>
              <span className={styles.strongLight}>Tratament complet</span> - facial si corporal
            </li>
            <li>
              <span className={styles.strongLight}>Tratament personalizabil</span> - pentru toate tipurile de piele
            </li>
            <li>
              <span className={styles.strongLight}>Exfoliere intensa</span> - revigoreaza si reinnoiste tesutul
            </li>
            <li>
              <span className={styles.strongLight}>Extractie</span> - curatare profunda a tuturor impuritatilor
            </li>
            <li>
              <span className={styles.strongLight}>Drenaj limfatic</span> - ajuta la detoxifierea tesutului
            </li>
            <li>
              <span className={styles.strongLight}>Efectul de volumizare</span> - dureaza pana la 72 de
              ore dupa tratament
            </li>
            <li>
              <span className={styles.strongLight}>Imbunatatirea circulatiei</span> - ajuta la hidratarea
              celulara si la functiile pielii
            </li>
            <li>
              <span className={styles.strongLight}>Non-Invaziv</span>
            </li>
            <li>
              <span className={styles.strongLight}>Fara timp de recuperare</span> - pacientul isi poate
              relua imediat activitatile zilnice
            </li>
          </ul>

          </div>
        </article>

        <article>
          <h4 className={styles["text-invert"]} style={{marginBottom: '1.5rem'}}>FARA APASARE</h4>
          <p>
            <img src="/dermalinfusion/thumbnail_aplicator.png" className={styles.floatImage}
                 style={{float: "right", backgroundColor: "white", border: "1px solid white", objectFit: "contain"}}/>
            Aplicatorul patentat <span className={styles.strong}>Dermalinfusion®</span> este ergonomic si lucreaza independent, nefiind nesara
            presiunea mainii operatorului. Camera pneumatica de la varful piesei de mana creeaza o
            aspiratie in bucla inchisa dintre piele si varful aplicatorului, ridicand instantaneu pielea
            pentru abraziune si extractie, în timp ce presiunea pneumatica infuzeaza profund serurile
            bogate in nutrienti. Prin urmare, o acțiune usoara de alunecare este tot ceea ce este
            necesar pentru a stimula beneficiile pentru sanatatea pielii si pentru a minimaliza iritarea.
          </p>
        </article>

        <article>
          <h4 className={styles["text-invert"]} style={{marginBottom: '1.5rem'}}>CAPETE DE TRATAMENT DE DIAMANT</h4>
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
            <img src="/dermalinfusion/diamantele.png" className={styles.imgRegular} style={{maxWidth: 200, objectFit: "contain", borderRadius: 10}}/>
            <ul className={styles.listStyle}>
              <li>
                Diamantele incrustate au diferite granulatii
                pentru a putea aborda fiecare tip de piele
              </li>
              <li>Calitatea diamentelor permit tratamente sigure
                inclusiv pe zonele sensibile ale ochilor sau a
                buzelor</li>
              <li>Disponibil in 6 variante de abraziune</li>
            </ul>
          </div>
        </article>

        <article className="mb-3">
          <h4 className={styles["text-invert"]} style={{marginBottom: '1rem'}}>
            REZULTATE PERSONALIZATE CU SERUMURILE PRO-INFUSION
            <hr/>
            <p style={{fontSize: 16, fontWeight: 100}}>Special create, serumurile Pro-Infusion
              sunt livrate la adancimi optime in functie
              de afectiunile vizate</p>
          </h4>
          <div className={styles.titleImage}>
            <img src="/dermalinfusion/serums.jpg"/>
          </div>
          <div className={styles.titleImage}>
            <img src="/dermalinfusion/results.png" className="mt-3"/>
          </div>
        </article>
      </section>
      {/*<hr/>*/}
      {/*<section className={styles.section}>*/}

      {/*  <h4 style={{fontWeight: 600}}><span><FcQuestions size="2rem" className="me-2"/></span>Întrebări frecvente</h4>*/}
      {/*  <article>*/}
      {/*    <p>*/}
      {/*      <span><strong>Ce este Sylfirm X?</strong></span> <br/>*/}
      {/*      SYLFIRM X este un sistem inovator, de ultima generație, aprobat de FDA,*/}
      {/*      ce combină terapia cu microelectrozi și radiofrecvența fracționată bipolară*/}
      {/*      <br/>*/}
      {/*      Acest dispozitiv inovator utilizează tehnologia avansată cu undă duală (undă continuă și undă pulsată),*/}
      {/*      fiind astfel eficient în realizarea unor proceduri de lifting și antiaging,*/}
      {/*      în tratarea diferitelor tipuri de  cicatrici, precum și în tratarea leziunilor pigmentare și vasculare,*/}
      {/*      cum ar fi melasma, venele păianjen și rozaceea, care erau dificil de tratat cu sistemele tradiționale*/}
      {/*      de microneedling sau RF.*/}
      {/*    </p>*/}
      {/*  </article>*/}
      {/*  <article>*/}
      {/*    <p>*/}
      {/*      <span><strong>Cum funcționează tehnologia RF fracționat? </strong></span> <br/>*/}
      {/*      RF fracționat este o procedură minim invazivă, ce combină beneficiile terapiilor cu microelectrozi*/}
      {/*      și a radiofrecvenței într-o singură procedură. Microelectrozii produc micro-incizii controlate*/}
      {/*      în piele și stimulează factorul natural de creștere, procesul de vindecare al rănilor și*/}
      {/*      producerea de colagen. Deasemenea, aceștia ajută la descompunerea țesutului cicatricial.*/}
      {/*      Energia RF este livrată pielii prin intermediul microelectrozilor neizolați,*/}
      {/*      generând căldură la 40-60° C, temperatură ce determină coagularea și denaturarea proteinelor*/}
      {/*      sau modificări structurale ale proteinelor, ducând la inflamația și contracția colagenului,*/}
      {/*      stimulând răspunsul de vindecare și promovând producția de colagen nou.*/}
      {/*    </p>*/}
      {/*  </article>*/}
      {/*  <article>*/}
      {/*    <p>*/}
      {/*      <span><strong>Cât de sigur este Sylfirm X?</strong></span> <br/>*/}
      {/*      Numeroasele studii clinice efectuate asupra sistemului, ne asigură privind realizarea unui tratament*/}
      {/*      eficient, fără efecte adverse raportate. Microelectrozii sunt fabricați de un sistem robotizat,*/}
      {/*      pentru oferirea unui tratament precis și sigur. Deasemenea, sistemul deține protocoale preinstalate,*/}
      {/*      special concepute pentru diferite tipuri de piele și indicații, prin urmare, este posibilă realizarea*/}
      {/*      un tratament personalizat și delicat, având în vedere particularitățile fiecărui pacient,*/}
      {/*      zona de tratament și condiția pielii.*/}
      {/*    </p>*/}
      {/*  </article>*/}
      {/*  <article>*/}
      {/*    <p>*/}
      {/*      <span><strong>Care sunt diferențele dintre tratamentele laser și tehnologia RF fracționată?</strong></span> <br/>*/}
      {/*      Laserul este folosit în medicina estetică de peste 20 de ani, dar este asociat cu perioade de repaus*/}
      {/*      semnificative și cu un risc ridicat de complicații și restricții pre și post procedură.*/}
      {/*      <br/>*/}
      {/*      Radiofrecvența fracționată este cea mai promițătoare tehnologie pentru tratamentele estetice,*/}
      {/*      combinând două metode utilizate anterior, individual, pentru întinerirea pielii,*/}
      {/*      realizată prin intermediul unei proceduri mai eficiente din punct de vedere clinic.*/}
      {/*      Acest nou tratament poate oferi rezultate similare cu metodele laser, dar cu disconfort și*/}
      {/*      perioade de repaus social semnificativ mai mici.*/}
      {/*    </p>*/}
      {/*  </article>*/}
      {/*  <article>*/}
      {/*    <p>*/}
      {/*      <span><strong>Pentru ce indicații este recomandat Sylfirm X?</strong></span> <br/>*/}
      {/*      Cu Sylfirm X putem efectua tratamente pentru următoarele indicații: lifting și tightening facial*/}
      {/*      și corporal, barbie dublă, riduri fine și profunde, acnee, cicatrici, hiperpigmentare,*/}
      {/*      hiperhidroză, granulom, rozacee și cuperoză, vergeturi în faza acută sau cronică.*/}
      {/*    </p>*/}
      {/*  </article>*/}
      {/*  <article>*/}
      {/*    <p>*/}
      {/*      <span><strong>Ce zone se pot trata cu Sylfirm X?</strong></span> <br/>*/}
      {/*      Prin intermediul protocoalelor presetate, se pot trata atât zonele fetei,*/}
      {/*      cât și cele ale corpului, inclusiv zona orbiculară, gât, decolteu, până la axila, brațe și abdomen.*/}
      {/*    </p>*/}
      {/*  </article>*/}
      {/*  <article>*/}
      {/*    <p>*/}
      {/*      <span><strong>Câte tratamente/ședințe sunt necesare?</strong></span> <br/>*/}
      {/*      În funcție de indicații și zona tratată, numărul mediu de ședințe este 2-5,*/}
      {/*      la un interval de 2–4 săptămâni.*/}
      {/*    </p>*/}
      {/*  </article>*/}
      {/*  <article>*/}
      {/*    <p>*/}
      {/*      <span><strong>Care este perioada de recuperare și ce reacții pot apărea după tratamentele cu SylfirmX?</strong></span> <br/>*/}
      {/*      Sylfirm X  livrează energia RF prin intermediul microelectrozilor și poate trata în profunzime țesutul,*/}
      {/*      în condiții de siguranță. Acest lucru permite reîntoarcerea la viață socială imediat,*/}
      {/*      pacientul resimțind doar o ușoră roșeață timp de 1-4 ore post procedură.*/}
      {/*    </p>*/}
      {/*  </article>*/}
      {/*  <article>*/}
      {/*    <p>*/}
      {/*      <span><strong>Care sunt beneficiile tratamentelor realizate cu Sylfirm X?</strong></span> <br/>*/}
      {/*      Cu Sylfirm X se realizează proceduri minim invazive, datorită utilizării a două tipuri de unda,*/}
      {/*      în funcție de indicații putem aborda personalizat fiecare zonă în parte,*/}
      {/*      astfel încâ, într-o singură ședință, să putem trata multiple indicații.*/}
      {/*    </p>*/}
      {/*  </article>*/}
      {/*  <article>*/}
      {/*    <p>*/}
      {/*      <span><strong>Când se văd rezultatele tratamentelor cu Sylfirm X?</strong></span> <br/>*/}
      {/*      Rezultatele sunt vizibile imediat în cazul indicațiilor de skin tightening,*/}
      {/*      datorită contractării fibrelor în timpul procedurii, și treptat, până la 3-4 săptămâni,*/}
      {/*      în cazul indicațiilor de corectare a pigmentării, leziunilor vasculare și cicatricilor.*/}
      {/*    </p>*/}
      {/*  </article>*/}
      {/*</section>*/}
    </div>
  )
}

export default Dermalinfusion;