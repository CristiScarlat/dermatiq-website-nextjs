import { useContext } from 'react';
import { ImArrowRight, ImCalendar } from 'react-icons/im';
import Link from 'next/link';
import styles from "./styles/styles.module.css";
import { Ctx } from "../context/context";

const CustomLinkBtn = () => {

    const ctx = useContext(Ctx);
    const lang = ctx.state.lang;
    
    return (
        <div className={styles['booking-button']}>
            <ImCalendar className="me-2" />
            <Link href="/booking" passHref><span style={{cursor: 'pointer', fontSize: 18}}>
                {lang === 'ro' && "Fă-ți o programare"}
                {lang === 'en' && "Make an appointment"}
                </span></Link>
                {/* <ImArrowRight className="hover-pointer ms-3" /> */}
        </div>
    )
}

export default CustomLinkBtn;