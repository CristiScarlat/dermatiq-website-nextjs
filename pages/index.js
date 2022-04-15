import CustomCard from '../components/CustomCard';
import { serviceCards, treatmentCards } from '../utils/uiConstants';
import SlickSlider from '../components/SlickSlider';
import CustomLinkBtn from "../components/customLinkBtn";
import { MdLocationOn, MdOutlineMail, MdPhone } from "react-icons/md";
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <main className={styles['home-main']}>
        <div className={`p-3 ${styles['head-contact-phone']}`} style={{
          background: `url(/home-image-andrada.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundColor: '#e4e6d3'
        }}>
          <div>
            <div className='mt-3' style={{letterSpacing: '0.2rem'}}>Dermatologie</div>
            <div style={{letterSpacing: '0.2rem'}}>Venerologie</div>
            <div style={{letterSpacing: '0.2rem'}}>Chirurgie</div>
            <div className='mb-5' style={{letterSpacing: '0.2rem'}}>DermatoEstetica</div>

            <div className={`mt-5 ${styles['home-programari-rapide']}`}>
              {/* <div style={{ whiteSpace: 'nowrap' }}>Programari rapide</div>
              <div style={{ whiteSpace: 'nowrap', marginBottom: '1rem' }}>+40 748 015 255</div> */}
              <CustomLinkBtn />
            </div>
          </div>
        </div>

        <hr className='sections-separator' />
        <div className='section-title'>Proceduri</div>
        <SlickSlider width='65%'>
          {serviceCards.map((service, index) => (
            <CustomCard key={service.img + '-' + index} cardTitle={service.title} imgSrc={service.img} className={`m-3 ${styles['home-custom-card']}`}>
              <p className="card-text">
                {service.body}
              </p>
            </CustomCard >
          ))}
        </SlickSlider>

        <hr className='sections-separator' />
        <div className='section-title'>Tratamente</div>
        <SlickSlider width='65%'>
          {treatmentCards.map((service, index) => (
            <CustomCard key={service.img + '-' + index} cardTitle={service.title} imgSrc={service.img} className={`m-3 ${styles['home-custom-card']}`}>
              <p className="card-text">
                {service.body}
              </p>
            </CustomCard >
          ))}
        </SlickSlider>

        <hr className='sections-separator' />
        <div className="w-100">
          <div className={`${styles['custom-icon-contact-container']} d-flex justify-content-evenly mb-5`}>
              <div className={styles['custom-icon-contact']}>
                <div style={{ width: "100px" }}>
                  <MdLocationOn />
                </div>
                <div style={{ color: "#807f89" }}>Str. Ioan Plavosin, nr. 31
                  <br />
                  Timisoara, 300361
                </div>
              </div>
              <div className={styles['custom-icon-contact']}>
                <div style={{ width: "100px" }}>
                  <MdOutlineMail />
                </div>
                <div style={{ color: "#807f89" }}>
                  office@clinica-dermatiq.com
                </div>
              </div>
              <div className={styles['custom-icon-contact']}>
                <div style={{ width: "100px" }}>
                  <MdPhone />
                </div>
                <div style={{ color: "#807f89" }}>
                  +40 256 443-084
                </div>
              </div>
          </div>
          <div className='ps-5 pe-5 w-100'>
            <iframe width="100%" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=Clinica%20DermatIQ&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home;
