import {useEffect, useRef, useContext} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {serviceCards} from '../utils/uiConstants';
import {Ctx} from "../context/context";
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
          <h1 ref={ref => {
            titleRef.current[service.title] = ref
          }}>{service.title}</h1>
          {service?.redirectLink && <Link href={service.redirectLink}>
              <p style={{
                backgroundColor: '#6a77b0',
                padding: '0.5rem',
                borderRadius: '10px',
                color: 'whitesmoke',
                cursor: 'pointer',
              }}>
                <span style={{
                  marginRight: '1rem',
                  backgroundColor: 'red',
                  padding: '0.2rem',
                  borderRadius: '5px',
                }}>NEW</span>
                {lang === "ro" ? "Afla mai multe" : "Read more"}
              </p>
          </Link>}
          <div className={styles['service-content']}>
            <p>
              <img src={service.img} alt="..." style={{float: index % 2 ? "left" : "right"}}/>
              {service.details}
            </p>

          </div>
        </div>
      ))}
    </div>
  )
}

export default Services