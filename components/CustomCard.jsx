
const CustomCard = ({imgSrc, cardTitle, className, children}) => {
    return (
        <div className={`card ${className}`} style={{ width: '20rem' }}>
            {imgSrc && <img src={imgSrc} class="card-img-top" alt="..." />}
            <div className="card-body text-center">
                <h5 className="card-title">{cardTitle}</h5>
                {children}
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
    )
}

export default CustomCard;