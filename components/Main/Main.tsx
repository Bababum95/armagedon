import Image from 'next/image';
import { FC } from 'react';
import styles from './Main.module.css'

interface MainProps {
    children: React.ReactNode
}

const Main: FC<MainProps> = ({children}) => {
  return (
    <main className={styles.container}>
        <Image
            src='/images/planeta_zemlia_kosmos_167499_2560x1600 1.png'
            alt='Планета Земля'
            width={300}
            height={436}
            priority
            className={styles.planet}
        />
        {children}
    </main>
  )
}

export default Main