import Head from 'next/head';
import Image from 'next/image';
import NavHead from '../components/NavHead';
import CustomCard from '../components/CustomCard';
import { serviceCards } from '../utils/uiConstants';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <NavHead />
      </Head>

      <main className={styles.main}>
        <div className={`p-3 ${styles['head-contact-phone']}`} style={{
          background: `url(/home-image-andrada.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundColor: '#671a9d69'
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
        <div className='d-flex'>
          {serviceCards.map(service => (
            <CustomCard cardTitle={service.title} imgSrc={service.img} className="m-3">
              <p className="card-text">
                {service.body}
              </p>
            </CustomCard >
          ))}
        </div>
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
