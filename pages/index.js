import { useContext } from "react";
import CustomCard from "../components/CustomCard";
import {
  serviceCards,
  treatmentCards,
  mainImageBigText,
} from "../utils/uiConstants";
import SlickSlider from "../components/SlickSlider";
import CustomLinkBtn from "../components/customLinkBtn";
import { MdLocationOn, MdOutlineMail, MdPhone } from "react-icons/md";
import { useRouter } from "next/router";
import { Ctx } from "../context/context";
import styles from "../styles/Home.module.css";

//vogue
//preturi

const Home = () => {
  const router = useRouter();
  const ctx = useContext(Ctx);

  const lang = ctx.state.lang;

  return (
    <div className={styles.container}>
      <main className={styles["home-main"]}>
        <div
          className={`${styles["head-contact-phone"]}`}
          style={{
            background: `url(/home-image-v2.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundColor: "#f4f7f7",
          }}
        >
          <div style={{ backgroundColor: "#2e050554" }}>
            <div className={`${styles["home-main-image-big-text"]} mt-3`}>
              {mainImageBigText[lang][0]}
            </div>
            <div className={styles["home-main-image-big-text"]}>
              {mainImageBigText[lang][1]}
            </div>
            <div className={styles["home-main-image-big-text"]}>
              {mainImageBigText[lang][2]}
            </div>
            <div className={`${styles["home-main-image-big-text"]} mb-5`}>
              {mainImageBigText[lang][3]}
            </div>

            <div className={`m-3 ${styles["home-programari-rapide"]}`}>
              {/* <div style={{ whiteSpace: 'nowrap' }}>Programari rapide</div>
              <div style={{ whiteSpace: 'nowrap', marginBottom: '1rem' }}>+40 748 015 255</div> */}
              <CustomLinkBtn />
            </div>
          </div>
        </div>

        <hr className="sections-separator" />
          <div className="section-title">
            {lang === "ro" && "Proceduri"}
            {lang === "en" && "Procedures"}
          </div>
          <SlickSlider width="65%">
            {serviceCards[lang].map((service, index) => (
              <CustomCard
                key={service.img + "-" + index}
                cardTitle={service.title}
                imgSrc={service.img}
                className={`m-3 ${styles["home-custom-card"]}`}
                buttonLable={lang === "ro" ? "Afla mai multe" : "Read more"}
                cardButtonOnCLick={() =>
                  router.push({
                    pathname: "/services",
                    query: { name: service.title },
                  })
                }
              >
                <p className="card-text">{service.body}</p>
              </CustomCard>
            ))}
          </SlickSlider>
        <hr className="sections-separator" />
        <div className="section-title">
          {lang === "ro" && "Rezultate"}
          {lang === "en" && "Results"}
        </div>
        <SlickSlider width="65%">
          {treatmentCards[lang].map((service, index) => (
            <CustomCard
              key={service.img + "-" + index}
              cardTitle={service.title}
              imgSrc={service.img}
              className={`m-3 ${styles["home-custom-card"]}`}
              buttonLable={lang === "ro" ? "Afla mai multe" : "Read more"}
            >
              <p className="card-text">{service.body}</p>
            </CustomCard>
          ))}
        </SlickSlider>

        <hr className="sections-separator" />
        <div className="w-100">
          <div
            className={`${styles["custom-icon-contact-container"]} d-flex justify-content-evenly mb-5`}
          >
            <div className={styles["custom-icon-contact"]}>
              <div style={{ width: "100px" }}>
                <MdLocationOn />
              </div>
              <div style={{ color: "#807f89" }}>
                Str. Ioan Plavosin, nr. 31
                <br />
                Timisoara, 300361
              </div>
            </div>
            <div className={styles["custom-icon-contact"]}>
              <div style={{ width: "100px" }}>
                <MdOutlineMail />
              </div>
              <div style={{ color: "#807f89" }}>
                office@clinica-dermatiq.com
              </div>
            </div>
            <div className={styles["custom-icon-contact"]}>
              <div style={{ width: "100px" }}>
                <MdPhone />
              </div>
              <div style={{ color: "#807f89" }}>
                +40 256 443-084
                <br />
                +40 748 015 255
              </div>
            </div>
          </div>
          <div className="ps-5 pe-5 w-100">
            <iframe
              width="100%"
              height="400"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=Clinica%20DermatIQ&t=&z=17&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
