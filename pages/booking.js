import { useState } from "react";
import CustomCard from '../components/CustomCard';
import DatePicker from "react-datepicker";
import { teamCards } from "../utils/uiConstants";
import styles from "../styles/Booking.module.css";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div >
      <main >
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
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect inline />
        </div>
      </main>
    </div>
  )
};
