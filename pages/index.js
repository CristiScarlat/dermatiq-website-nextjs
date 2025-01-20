import {useContext} from "react";
import CustomCard from "../components/CustomCard";
import {
    serviceCards,
    treatmentCards,
    mainImageBigText,
    otherServices
} from "../utils/uiConstants";
import SlickSlider from "../components/SlickSlider";
import {MdLocationOn, MdPhone} from "react-icons/md";
import {useRouter} from "next/router";
import {Ctx} from "../context/context";
import styles from "../styles/Home.module.css";

const Home = () => {

    const router = useRouter();
    const ctx = useContext(Ctx);

    const lang = ctx.state.lang;

    return (
        <main className={styles["home-main"]}>
            <>
                <div>
                    <video autoPlay muted width="100%">
                        <source src="/homeIntroMedia/dermatiq-intro-crop.mp4" type="video/mp4"/>
                        <source src="/homeIntroMedia/ClinicaDermatIQ-intro.ogg" type="video/ogg"/>
                        Your browser does not support the video tag.
                    </video>

                    <div className={`${styles["head-contact-phone"]}`}>
                        <div>
                            {mainImageBigText[lang][0]}
                        </div>
                        <div>
                            {mainImageBigText[lang][1]}
                        </div>
                        <div>
                            {mainImageBigText[lang][2]}
                        </div>
                        <div>
                            {mainImageBigText[lang][3]}
                        </div>
                        <div>
                            {mainImageBigText[lang][4]}
                        </div>
                    </div>

                    <p className="text-center mt-4" style={{opacity: 0.6}}>{otherServices[lang]}</p>
                    <div className={`${styles["head-contact-phone"]} justify-content-center gap-4`}
                         style={{opacity: 0.6}}>
                        <div>
                            {mainImageBigText[lang][5]}
                        </div>
                        <div>
                            {mainImageBigText[lang][6]}
                        </div>
                        <div>
                            {mainImageBigText[lang][7]}
                        </div>
                    </div>
                </div>
            </>
            <hr className="sections-separator"/>
            <div className="mt-4"/>
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
                        className={`m-3 ${styles["home-custom-card"]} ${service?.new ? styles.new : ""}`}
                        cardBodyClassName="d-flex flex-column justify-content-evenly"
                        buttonLable={lang === "ro" ? "Afla mai multe" : "Read more"}
                        cardButtonOnCLick={() =>
                            router.push({
                                pathname: service?.redirectLink || "/services",
                                query: {name: service.title},
                            })
                        }
                    >
                        <p className="card-text card-body-paragraph">{service.body}</p>
                    </CustomCard>
                ))}
            </SlickSlider>
            <hr className="sections-separator"/>
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
                        className={`m-3 p-2 ${styles["home-custom-card"]}`}
                        showButton={false}
                        contentHeight={true}
                    >
                        <div className={styles["home-results-container"]}
                             dangerouslySetInnerHTML={{__html: service.body}}/>
                    </CustomCard>
                ))}
            </SlickSlider>

            <hr className="sections-separator"/>
            <div className="w-100">
                <div
                    className={`${styles["custom-icon-contact-container"]} d-flex justify-content-evenly mb-5`}
                >
                    <div className={styles["custom-icon-contact"]}>
                        <div style={{width: "100px"}}>
                            <MdLocationOn/>
                        </div>
                        <div style={{color: "#807f89"}}>
                            Str. Ioan Plavosin, nr. 31
                            <br/>
                            Timisoara, 300361
                        </div>
                    </div>
                    <div className={styles["custom-icon-contact"]}>
                        <div style={{width: "100px"}}>
                            <MdPhone/>
                        </div>
                        <div style={{color: "#807f89"}}>
                            +40 256 443 084
                            <br/>
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
    );
};

export default Home;
