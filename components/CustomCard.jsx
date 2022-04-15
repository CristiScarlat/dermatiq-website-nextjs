import Image from 'next/image';

const CustomCard = ({imgSrc, cardTitle, className, maxWidth, showButton=true, children}) => {
    return (
        <div className={`card ${className}`} style={{ maxWidth }}>
            {imgSrc && <Image src={imgSrc} className="card-img-top" alt="..." width={200} height={178.83}/>}
            <div className="card-body text-center" style={{maxHeight: '15rem', overflowY: 'hidden'}}>
                <h5 className="card-title">{cardTitle}</h5>
                {children}
            </div>
            {showButton && <a href="#" className="btn btn-primary" style={{position: 'absolute', bottom: 0, width: '100%', borderColor: '#7bab4f', backgroundColor: '#7bab4f'}}>Afla mai multe</a>}
        </div>
    )
}

export default CustomCard;