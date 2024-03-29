import React, { useState, useRef, useEffect } from 'react';
import { gallery } from '../utils/uiConstants'
import styles from '../styles/Galery.module.css'
import Image from 'next/image';
import { Spinner } from 'react-bootstrap';

const Galery = () => {

    const [selectedImg, setSelectedImg] = useState();
    const [animMoveImg, setAnimMoveImg] = useState(0);
    const [animHideImg, setAnimHideImg] = useState(1);
    const [loadingImage, setLoadingImage] = useState(false);

    const bigImageRef = useRef();

    const photoArray = new Array(gallery.qty).fill(gallery.baseFotoName).map((elem, index) => elem + index);

    let toushStart = false;
    let touchMoves = [];

    useEffect(() => {
        setLoadingImage(true)
    }, [selectedImg])

    const handleOnTouchStart = () => {
        toushStart = true;
    }

    const handleOnTouchMove = (e) => {
        if (toushStart && touchMoves.length < 2 && e.touches.length === 1) {
            touchMoves.push(e?.touches[0]?.clientX)
        }
    }

    const incrementWithAnimation = () => {
        const imgWidth = bigImageRef.current.clientWidth + 100
        setAnimMoveImg(-imgWidth);
        setTimeout(() => {
            setAnimHideImg(0);
            setAnimMoveImg(imgWidth);
            if (selectedImg === photoArray.length - 1) setSelectedImg(0);
            else setSelectedImg(prev => prev + 1);
        }, 250);

        setTimeout(() => {
            setAnimHideImg(1);
            setAnimMoveImg(0)
        }, 500)
    }

    const decrementWithAnimation = () => {
        const imgWidth = bigImageRef.current.clientWidth - 100
        setAnimMoveImg(imgWidth);
        setTimeout(() => {
            setAnimHideImg(0);
            setAnimMoveImg(-imgWidth);
            if (selectedImg === 0) setSelectedImg(photoArray.length - 1);
            else setSelectedImg(prev => prev - 1);
        }, 250);

        setTimeout(() => {
            setAnimHideImg(1);
            setAnimMoveImg(0)
        }, 500)
    }

    const handleOnTouchEnd = () => {
        toushStart = false;
        if (touchMoves.length < 2) return
        if (touchMoves[0] > touchMoves[1]) {
            incrementWithAnimation()
        }
        else {
            decrementWithAnimation()
        }
        touchMoves = [];
    }

    return (
        <>
            <div className="text-center pt-4">
                <div className={styles["galery-wrapper"]}>
                    {photoArray.map((photo, index) => (
                        <Image
                            key={photo}
                            src={`/gallery/thumbnail_${photo}.jpeg`}
                            alt="galery item"
                            width={320}
                            height={320}
                            onClick={() => setSelectedImg(index)}
                        />
                    ))}
                </div>
            </div>
            {selectedImg !== undefined && <div className={styles["galery-img-zoom-container"]}>
                <button
                    className="btn-close btn-close-white"
                    style={{ position: 'absolute', top: 20, right: 20 }}
                    onClick={() => setSelectedImg(undefined)}></button>

                <button onClick={decrementWithAnimation} className={styles["galery-img-zoom-nav-prev"]}>&#x27A4;</button>
                <div className={styles["galery-img-zoom-content"]}>
                    <img
                        onLoad={() => setLoadingImage(false)}
                        src={`/gallery/${photoArray[selectedImg]}.jpeg`}
                        alt="galery item"
                        style={{ left: animMoveImg, opacity: animHideImg, visibility: loadingImage ? 'hidden' : 'visible' }}
                        ref={bigImageRef}
                        onTouchStart={handleOnTouchStart}
                        onTouchMove={handleOnTouchMove}
                        onTouchEnd={handleOnTouchEnd}
                    />
                    {loadingImage && <Spinner animation="border" role="status" variant="light" style={{position: 'absolute'}}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                </div>
                <button onClick={incrementWithAnimation} className={styles["galery-img-zoom-nav-next"]}>&#x27A4;</button>
            </div>}
        </>
    )
}

export default Galery;