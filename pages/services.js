import { useEffect, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { serviceCards } from '../utils/uiConstants';
import { Ctx } from "../context/context";
import styles from '../styles/Services.module.css';

const Services = () => {

    const ctx = useContext(Ctx);
    const lang = ctx.state.lang

    const titleRef = useRef({});
    const router = useRouter();

    useEffect(() => {
        if (router?.query?.name) {
            const selectedElem = titleRef.current[router.query.name];
            window.scrollTo(0, selectedElem?.offsetTop - 150);
        }
    }, [router.query]);

    return (
        <div className="p-2 d-flex flex-column justify-content-center align-items-center">
            {serviceCards[lang].map((service, index) => (
                <div key={service.title + "" + index} className={styles['service-content-container']}>
                    <h1 ref={ref => { titleRef.current[service.title] = ref }}>{service.title}</h1>
                    <div className={styles['service-content']}>
                        <p>
                            <img src={service.img} alt="..." style={{float: index%2 ? "left" : "right"}}/>
                            {service.details}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Services