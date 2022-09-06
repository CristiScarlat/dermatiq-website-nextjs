import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselLegendContent = ({index}) => {

  const carouselLegendStyle = [
    {
      bottom: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    },
    {
      bottom: 0,
      left: 0,
    }
  ]

  return (
    <div  style={carouselLegendStyle[index]}>
        {index === 0 && <>
        <h1>Suntem aici pentru tine</h1>
        <p>
          Echipa noastră de medici experți este pregătită să răspundă celor mai
          dificile provocări de la pacienții noștri.{" "}
          {/* <button
            className="covid  btn-light btn-sm"
            type="button"
            onClick={() => setShowModal(true)}
          >
            COVID 19 info
          </button> */}
        </p>
        <p style={{ margin: "1.5rem 0" }}>
          <a
            href="https://olidental.ro/#contact"
            className="custom-button-link mt-2 mb-2"
          >
            Programează o consultație
          </a>
        </p>
        </>}
        {index === 1 && <>
        <h1>Oferim servicii complete in clinica noastra</h1>
        <p>
        Echipa OliDental Clinic oferă servicii conexe de Radiologie dentară și Tomografie computerizată dentară, ca parte a diagnosticului și elaborării planului de tratament.{" "}
         
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

const CustomCarousel = ({ showThumbs = true }) => {
  return (
    <Carousel
      showThumbs={showThumbs}
      dynamicHeight={true}
      infiniteLoop
      autoPlay={true}
      showStatus={false}
      interval={5000}
    >
      <div>
        <img src="/homeCarousel/home-carousel-1.jpeg" alt="..." />
        <CarouselLegendContent index={0} />
      </div>
      <div>
        <img src="/homeCarousel/home-carousel-2.jpeg" />
        <CarouselLegendContent index={1} />
      </div>
      <div>
        <img src="/homeCarousel/home-carousel-3.jpeg" />
        <CarouselLegendContent index={2} />
      </div>
    </Carousel>
  );
};

export default CustomCarousel;