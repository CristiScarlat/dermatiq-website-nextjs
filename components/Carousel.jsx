import { Carousel } from "react-bootstrap";
import Image from 'next/image';

const CustomCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <Image
                    //width={460}
                    //className="d-block w-100"
                    src="homeCarousel/home-carousel-1.jpg"
                    alt="First slide"
                />
                {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    //width={460}
                    //className="d-block w-100"
                    src="homeCarousel/home-carousel-2.jpg"
                    alt="Second slide"
                />

                {/* <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    //width={460}
                    //className="d-block w-100"
                    src="homeCarousel/home-carousel-3.jpg"
                    alt="Third slide"
                />

                {/* <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
        </Carousel>

    )
}

export default CustomCarousel;

/*
        ////////////////////////////////////////////////////////////
        <div id={carouselId} className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src="homeCarousel/home-carousel-1.jpg" alt="First slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="homeCarousel/home-carousel-2.jpg" alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100" src="homeCarousel/home-carousel-3.jpg" alt="Third slide" />
                </div>
            </div>
            <a className="carousel-control-prev" href={`#${carouselId}`} role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href={`#${carouselId}`} role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        */