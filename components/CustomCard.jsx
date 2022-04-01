
const CustomCard = ({imgSrc, cardTitle, className, maxWidth, children}) => {
    return (
        <div className={`card ${className}`} style={{ maxWidth }}>
            {imgSrc && <img src={imgSrc} className="card-img-top" alt="..." style={{maxHeight: 178.83}}/>}
            <div className="card-body text-center" style={{maxHeight: '15rem', overflowY: 'hidden'}}>
                <h5 className="card-title">{cardTitle}</h5>
                {children}
            </div>
            <a href="#" className="btn btn-primary" style={{position: 'absolute', bottom: 0, width: '100%', borderColor: '#bc9dd3', backgroundColor: '#bc9dd3'}}>Afla mai multe</a>
        </div>
    )
}

export default CustomCard;