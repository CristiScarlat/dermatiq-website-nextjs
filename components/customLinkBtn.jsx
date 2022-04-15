import { ImArrowRight, ImCalendar } from 'react-icons/im';
import Link from 'next/link';
import styles from "./styles/styles.module.css";

const CustomLinkBtn = () => {
    return (
        <div className={styles['booking-button']}>
            <ImCalendar className="me-2" />
            Fă-ți o programare
            <div className="ms-3 me-3" style={{ height: '3rem', border: '0.5px solid #4f6e34' }} />
            <Link href="/booking" passHref><ImArrowRight className="hover-pointer" /></Link>
        </div>
    )
}

export default CustomLinkBtn;