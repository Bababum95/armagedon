import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.container}>
      <h2 className={styles.title}>ARMAGEDDON 2023</h2>
      <p className={styles.description}>
        ООО “Команда им. Б. Уиллиса”.
        Взрываем астероиды с 1998 года.
      </p>
    </header>
  )
}

export default Header