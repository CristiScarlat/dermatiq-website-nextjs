import React from 'react';
import { galery } from '../utils/uiConstants'
import styles from '../styles/Galery.module.css'
import Image from 'next/image';

const Galery = () => {

    const photoArray = new Array(galery.qty).fill(galery.baseFotoName).map((elem, index) => elem + index);

    return (
        <div className="text-center pt-4">
            <div className={styles["galery-wrapper"]}>
                {photoArray.map(photo => (
                    <Image key={photo} src={`/galery/${photo}.jpeg`} alt="galery item" width={320} height={320} />
                ))}
            </div>
        </div>
    )
}

export default Galery;