import {useContext, useEffect, useRef, useState} from "react";
import CustomCard from "../components/CustomCard";
import {
    serviceCards,
    treatmentCards,
    mainImageBigText,
    otherServices
} from "../utils/uiConstants";
import SlickSlider from "../components/SlickSlider";
import CustomLinkBtn from "../components/customLinkBtn";
import {MdLocationOn, MdOutlineMail, MdPhone} from "react-icons/md";
import {useRouter} from "next/router";
import {Ctx} from "../context/context";
import styles from "../styles/Home.module.css";
import CustomCarousel from "../components/Carousel";
import {Carousel} from "react-responsive-carousel";
import {isMobile} from "../utils/utils";

//vogue
//preturi

const Home = () => {

    const [popup, setPopup] = useState();
    const router = useRouter();
    const ctx = useContext(Ctx);

    const lang = ctx.state.lang;

    useEffect(() => {
        const storedData = sessionStorage.getItem('popup');
        if(storedData === null){
            sessionStorage.setItem('popup', 'true');
            setPopup(true);
        }
        else {
            setPopup(JSON.parse(storedData))
        }
    }, [])

    const handlePopup = () => {
        sessionStorage.setItem('popup', 'false')
        setPopup(false);
    }

    return (
        <main className={styles["home-main"]}>
            {popup && (
                <div className={styles["home-popup-wrapper"]}>
                    <div className={styles["home-popup-content"]}>
                        <button className="btn-close" onClick={handlePopup}/>
                        <img src="/events/ne_marim_echipa.jpg" alt="..."/>
                    </div>
                </div>
            )}
            <>
                {/* <CustomCarousel showThumbs={false} className={styles["home-carousel"]} lang={lang}/> */}
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
                        className={`m-3 ${styles["home-custom-card"]}`}
                        buttonLable={lang === "ro" ? "Afla mai multe" : "Read more"}
                        cardButtonOnCLick={() =>
                            router.push({
                                pathname: "/services",
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
                    {/* <div className={styles["custom-icon-contact"]}>
              <div style={{ width: "100px" }}>
                <MdOutlineMail />
              </div>
              <div style={{ color: "#807f89" }}>
                office@clinica-dermatiq.com
              </div>
            </div> */}
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
