import { ImArrowRight, ImCalendar } from 'react-icons/im';
import Link from 'next/link';
import styles from "./styles/styles.module.css";

const CustomLinkBtn = () => {
    return (
        <div className={styles['booking-button']}>
            <ImCalendar className="me-2" />
            <Link href="/booking" passHref><span style={{color: 'white', cursor: 'pointer'}}>Fă-ți o programare</span></Link>
                <ImArrowRight className="hover-pointer ms-3" />
        </div>
    )
}

export default CustomLinkBtn;