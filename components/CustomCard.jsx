import Image from 'next/image';
import styles from "./styles/styles.module.css";

const CustomCard = ({imgSrc, cardTitle, className, maxWidth, contentHeight, minHeight, showButton=true, buttonLable="", cardButtonOnCLick, children}) => {
    return (
        <div className={`${className}`} style={{ maxWidth, minHeight: contentHeight ? 'initial' : '30rem'}}>
            {imgSrc && <Image src={imgSrc} alt="..." width={200} height={178.83}/>}
            <div className="card-body text-center" style={{maxHeight: '15rem', overflowY: 'hidden'}}>
                <h5 className="card-title" style={{fontWeight: "bold", color: '#4956a0'}}>{cardTitle}</h5>
                {children}
            </div>
            {showButton && <button className={`btn ${styles['custom-card-button']}`} onClick={cardButtonOnCLick}>{buttonLable}</button>}
        </div>
    )
}

export default CustomCard;