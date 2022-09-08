import React from 'react';
import { galery } from '../utils/uiConstants'
import styles from '../styles/Galery.module.css'
import Image from 'next/image';

const Galery = () => {

    const photoArray = new Array(galery.qty).fill(galery.baseFotoName).map((elem, index) => elem + index);

    return (
        <div style={{textAlign: 'center'}}>
            <video autoPlay loop controls width="80%">
                <source src="https://firebasestorage.googleapis.com/v0/b/cris-web-apps.appspot.com/o/dermatiq%2FDermatIQ.mp4?alt=media&token=8939a276-f9d7-4984-89e3-df76842dd10a" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={styles["galery-wrapper"]}>
                {photoArray.map(photo => (
                    <Image key={photo} src={`/galery/${photo}.jpeg`} alt="galery item" width={320} height={320} />
                ))}
            </div>
        </div>
    )
}

export default Galery;