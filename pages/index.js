import Head from 'next/head';
import Image from 'next/image';

import CustomCard from '../components/CustomCard';
import { serviceCards, treatmentCards } from '../utils/uiConstants';
import SlickSlider from '../components/SlickSlider';
import styles from '../styles/Home.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <main className={styles['home-main']}>
        <div className={`p-3 ${styles['head-contact-phone']}`} style={{
          background: `url(/home-image-andrada.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundColor: '#7bab4f'
        }}>
          <div>
            <div className='mt-3'>Dermatologie</div>
            <div>Venerologie</div>
            <div>Chirurgie</div>
            <div className='mb-5'>DermatoEstetica</div>
            <div className={`mt-5 ${styles['home-programari-rapide']}`}>
              <div style={{ whiteSpace: 'nowrap' }}>Programari rapide</div>
              <div style={{ whiteSpace: 'nowrap' }}>+40 748 015 255</div>
            </div>
          </div>
        </div>

        <hr className='sections-separator'/>
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
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
