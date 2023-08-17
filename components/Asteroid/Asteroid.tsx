import { FC } from 'react'
import Link from 'next/link';

import { INearEarthObject } from '@/interfaces/IAsteroidData';
import { formattedDate } from '@/utils/formattedDate';
import styles from './Asteroid.module.css'
import Image from 'next/image';

interface AsteroidProps {
    name: string;
    diameter: number;
    dangerous: boolean;
    showButton: boolean;
    inCart: boolean;
    date: string;
    distance: string;
    asteroid: INearEarthObject;
    addToCart: (asteroid: INearEarthObject) => void;
}

const formattedName = (name: string) => {
    const openingIndex = name.indexOf('(');
    const closingIndex = name.indexOf(')');
    if (openingIndex !== -1 && closingIndex !== -1) {
        return name.substring(openingIndex + 1, closingIndex);
    }
    return '';
};


const Asteroid: FC<AsteroidProps> = ({
    asteroid,
    inCart,
    addToCart,
    showButton,
    name,
    diameter,
    dangerous,
    date,
    distance
}) => {

    return (
        <li className={styles.asteroid} >
            <Link href={`/${asteroid.id}`} >
            <p className={styles.date}>{formattedDate(date)}</p>
            <div className={styles.info}>
                <p className={styles.distance}>{distance}</p>
                <Image
                    src='/images/pngegg.png'
                    alt='астероид'
                    width={Math.round(diameter * 1000) > 100 ? 36 : 22}
                    height={Math.round(diameter * 1000) > 100 ? 40 : 24}
                />
                <div>
                    <h3 className={styles.name}>{formattedName(name)}</h3>
                    <p className={styles.diameter}>Ø {Math.round(diameter * 1000)} м</p>
                </div>
            </div>
            {showButton && (
                <>
                    {inCart ? (
                        <button className={styles.inCart}>В КОРЗИНЕ</button>
                    ) : (
                        <button className={styles.button} onClick={() => addToCart(asteroid)}>ЗАКАЗАТЬ</button>
                    )}
                </>
            )}
            {dangerous && (<span className={styles.dangerous}>Опасен</span>)}
            </Link>
        </li>
    )
}

export default Asteroid