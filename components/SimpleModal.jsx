import { useState } from "react";
import { Button } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./styles/styles.module.css"

const SimpleModal = ({children, show=false, onHide, onYesClick=() => {}, yesBtnLabel, cancelBtnLabel, title="Modal"}) => {

    return (
        show ? <div className={styles.simpleModalWrapper}>
            <div className={styles.simpleModalContent}>
                <div className={styles.simpleModalContentHeader}>
                    <h5 className="ps-2 m-0">{title}</h5>
                    <button onClick={onHide}><IoCloseSharp size="1.5rem"/></button>
                </div>
                <div className={styles.simpleModalContentBody}>{children}</div>
                <div className={styles.simpleModalContentFooter}>
                    <Button variant="outline-secondary" onClick={onHide}>{cancelBtnLabel}</Button>
                    <Button variant="primary" onClick={onYesClick}>{yesBtnLabel}</Button>
                </div>
            </div>
        </div> : null
    )
}

export default SimpleModal;