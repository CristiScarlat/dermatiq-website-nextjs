import styles from './styles/styles.module.css';

const Spinner = () => {
    return (
        <div className={styles["spinner-container"]}>
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner;