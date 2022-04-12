import { useState } from "react";
import CustomCard from '../components/CustomCard';
import DatePicker from "react-datepicker";
import { teamCards } from "../utils/uiConstants";
import Link from 'next/link';
import { ImArrowRight, ImCalendar } from 'react-icons/im';
import styles from "../styles/Booking.module.css";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <main className={styles['booking-main']}>
      <div className="d-flex flex-column align-items-center">
        <div className='section-title'>Echipa</div>
        <hr className='sections-separator' />
      </div>

      <div className={styles['booking-main-container']}>
        <div>
          <div className={styles['booking-team-cards-container']}>
            {teamCards.map((service, index) => {
              if (index < 3) {
                return (
                  <CustomCard
                    key={service.img + '-' + index}
                    cardTitle={service.title}
                    imgSrc={service.img}
                    showButton={false}
                    className={`mb-4 ${styles['booking-team-custom-card']}`}
                  >
                    <p className="card-text">
                      {service.body}
                    </p>
                  </CustomCard >
                )
              }
            })}
          </div>
          <div className={styles['booking-team-cards-container']}>
            {teamCards.map((service, index) => {
              if (index > 2) {
                return (
                  <CustomCard
                    key={service.img + '-' + index}
                    cardTitle={service.title}
                    imgSrc={service.img}
                    showButton={false}
                    className={styles['booking-team-custom-card']}
                  >
                    <p className="card-text">
                      {service.body}
                    </p>
                  </CustomCard >
                )
              }
            })}
          </div>
        </div>
        <div className={styles['booking-contact-schedule-container']}>
          <div className={styles['booking-button']}>
            <ImCalendar className="me-2" />
            Fă-ți o programare
            <div className="ms-3 me-3" style={{ height: '3rem', border: '0.5px solid #4f6e34' }} />
            <Link href="/"><ImArrowRight className="hover-pointer" /></Link>
          </div>
          <div className="w-100">
            <div>
              <p style={{ textAlign: "center" }}>
                <big>
                  <span style={{ color: "#807f89" }}>Str. Ioan Plavosin, nr. 31
                    <br />
                    Timisoara, 300361</span>
                </big><br />
                <big><a style={{ color: "#807f89" }} href="mailto:office@clinica-dermatiq.com">office@clinica-dermatiq.com</a></big><br />
                <big><a style={{ color: "#807f89" }} href="tel:0040256443084">+40 256 443-084</a></big>
              </p>
            </div>
            <div className='ps-5 pe-5 w-100'>
              <iframe width="100%" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=Clinica%20DermatIQ&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            </div>
          </div>
          {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect inline /> */}
        </div>
      </div>
    </main>
  )
};
