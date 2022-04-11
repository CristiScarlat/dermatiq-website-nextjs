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
        <iframe 
        style={{width: '45%', height: '20rem'}}
        srcDoc={`<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="300" id="gmap_canvas" src="https://maps.google.com/maps?q=Clinica%20DermatIQ&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://fmovies-online.net">fmovies</a><br><style>.mapouter{position:relative;text-align:right;height:300px;width:600px;}</style><a href="https://www.embedgooglemap.net">how to add google maps to a website</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:300px;width:600px;}</style></div></div>`}/>
      </main>
    </div>
  )
}
