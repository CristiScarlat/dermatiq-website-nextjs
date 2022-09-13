import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { MdPhone } from "react-icons/md";
import { mainImageBigText } from "../utils/uiConstants";
import styles from "./styles/styles.module.css";

const CarouselLegendContent = ({index, lang}) => {

  const carouselLegendStyle = [
    {
      // position: 'absolute',
      // bottom: 0,
      // left: 0,
      // right: 0,
      background: 'linear-gradient(0deg, rgba(73,86,160,0.5746673669467788) 0%, rgba(73,86,160,1) 100%)',
      color: 'white',
      fontWeight: 800,
      padding: '1rem',
      textAlign: 'start'
    },
    {
      // position: 'absolute',
      // bottom: 0,
      // left: 0,
      // right: 0,
      background: 'linear-gradient(0deg, rgba(73,86,160,0.5746673669467788) 0%, rgba(73,86,160,1) 100%)',
      color: 'white',
      fontWeight: 800,
      padding: '1rem',
      textAlign: 'start'
    },
    {
      // position: 'absolute',
      // bottom: 0,
      // left: 0,
      // right: 0,
      background: 'linear-gradient(0deg, rgba(73,86,160,0.5746673669467788) 0%, rgba(73,86,160,1) 100%)',
      color: 'white',
      fontWeight: 800,
      padding: '1rem',
      textAlign: 'start'
    }
  ]

  return (
    <div  style={carouselLegendStyle[index]} className={styles["carousel-legend"]}>
        {index === 0 && <>
        <h1>Suntem aici pentru tine</h1>
        <hr/>
        <h3>
          {mainImageBigText[lang].map(text => <p>{text}</p>)}
        </h3>
        <hr/>
        <div className="d-flex align-items-center gap-2">
              <MdPhone/>
              <span>
                +40 748 015 255
              </span>
            </div>
        </>}
        {index === 1 && <>
        <h1>Oferim servicii complete in clinica noastra</h1>
        <p>
        
         
        </p>
        <p style={{ margin: "1.5rem 0" }}>
          <a
            href="https://olidental.ro/#contact"
            className="custom-button-link mt-2 mb-2"
          >
            Vezi serviciile noastre
          </a>
        </p>
        </>}
        {index === 2 && <>
        <h1>Avem grija de cei mici</h1>
        <p>
        Echipa Olidental are specialisti in Pedodonție (tratamente la copii)
        </p>
        <p style={{ margin: "1.5rem 0" }}>
          <a
            href="https://olidental.ro/#contact"
            className="custom-button-link mt-2 mb-2"
          >
            Vezi serviciile noastre
          </a>
        </p>
        </>}
      {/* <div id="media_image-2" className="widget_media_image">
        <picture loading="lazy">
          <source
            type="image/webp"
            srcSet="images/TBI-Pay_RO_Medical-industy_Banner_1200x300.png.webp"
          />
          <img
            loading="lazy"
            src="images/TBI-Pay_RO_Medical-industy_Banner_1200x300.png"
            alt="Dental-Ro"
            // width="1200"
            // height="300"
          />
        </picture>
      </div> */}
    </div>
  );
};

//

const CustomCarousel = ({ showThumbs = true, className, lang }) => {
  return (
    <Carousel
      showThumbs={showThumbs}
      dynamicHeight={false}
      infiniteLoop
      autoPlay={true}
      showStatus={false}
      interval={5000}
      className={className}
    >
      <div className={styles["carousel-content-item"]}>
        <img src="/galery/dermatiq-galery-8.jpeg" alt="..."/>
        <CarouselLegendContent index={0} lang={lang}/>
      </div>
      <div className={styles["carousel-content-item"]}>
        <img src="/galery/dermatiq-galery-20.jpeg" alt="..."/>
        <CarouselLegendContent index={1} lang={lang}/>
      </div>
      <div className={styles["carousel-content-item"]}>
        <img src="/galery/dermatiq-galery-33.jpeg" alt="..."/>
        <CarouselLegendContent index={2} lang={lang}/>
      </div>
    </Carousel>
  );
};

export default CustomCarousel;