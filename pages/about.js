import { useContext } from "react";
import CustomCard from '../components/CustomCard';
import { teamCards, aboutTeamDescription, aboutPageTitle } from "../utils/uiConstants";
import CustomLinkBtn from "../components/customLinkBtn";
import { Ctx } from "../context/context";

import styles from "../styles/About.module.css";
import homeStyles from "../styles/Home.module.css";

const About = () => {

  const ctx = useContext(Ctx);
  const lang = ctx.state.lang

  return (
    <main className="d-flex flex-column">
      <video className="m-auto mt-3" autoPlay loop controls width="90%" muted style={{ maxWidth: '80rem' }}>
        <source src="https://firebasestorage.googleapis.com/v0/b/cris-web-apps.appspot.com/o/dermatiq%2FDermatIQ.mp4?alt=media&token=8939a276-f9d7-4984-89e3-df76842dd10a" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles['about-main']}>
        {/* <div className="d-flex flex-column align-items-center">
          <div className='section-title'>{aboutPageTitle[lang]}</div>
          <hr className='sections-separator' />
        </div>

        <div className="d-flex flex-column align-items-center">
          <div className={styles['about-team-description']}>
            {aboutTeamDescription[lang]}
          </div>
          <hr className='sections-separator' />
        </div> */}

        <hr className='sections-separator' />
        <div>
          <div>
            <div className="booking-team-cards-container">
              {teamCards[lang].filter(teamMember => teamMember.type === 'medic').map((service, index) => {
                return (
                  <CustomCard
                    key={service.img + '-' + index}
                    cardTitle={service.title}
                    imgSrc={service.img}
                    showButton={false}
                    className={`m-3 ${homeStyles["home-custom-card"]}`}
                    maxWidth="15rem"
                    contentHeight
                  >
                    <p className="card-text">
                      {service.body}
                    </p>
                  </CustomCard >
                )
              })}
            </div>
            <div className="booking-team-cards-container">
              {teamCards[lang].filter(teamMember => teamMember.type === 'nurse').map((service, index) => {
                return (
                  <CustomCard
                    key={service.img + '-' + index}
                    cardTitle={service.title}
                    imgSrc={service.img}
                    showButton={false}
                    className={`m-3 ${homeStyles["home-custom-card"]}`}
                    maxWidth="15rem"
                    contentHeight
                  >
                    <p className="card-text">
                      {service.body}
                    </p>
                  </CustomCard >
                )
              })}
            </div>
          </div>
          <div className={styles['about-contact-schedule-container']} style={{ marginTop: '2rem' }}>
            <CustomLinkBtn />
            <div className="w-100">
              <div>
                <p style={{ textAlign: "center" }}>
                  <big>
                    <span style={{ color: "#807f89" }}>Str. Ioan Plavosin, nr. 31
                      <br />
                      Timisoara, 300361</span>
                  </big><br />
                  <big><a className={styles["about-page-link"]} href="mailto:office@clinica-dermatiq.com">office@clinica-dermatiq.com</a></big><br />
                  <big><a className={styles["about-page-link"]} href="tel:0040256443084">+40 256 443-084</a></big>
                </p>
              </div>
              <div className='ps-5 pe-5 w-100'>
                <iframe width="100%" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=Clinica%20DermatIQ&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
};

export default About;