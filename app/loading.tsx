import styles from './loading.module.css'

const loading = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.container}>
                <div className={styles.planet}/>
                <div className={styles.spinner} />
            </div>
        </div>
    )
}

export default loading