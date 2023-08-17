'use client';
import { FC } from 'react'
import styles from './Asteroid.module.css'
import Image from 'next/image';

interface AsteroidProps {
    name: string;
    diameter: number;
    dangerous: boolean;
    date: string;
    distance: string;
}

const formattedKilometers = (distance: string) => {
    return parseFloat(distance).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).replace(/\,/g, ' ')
}

const formattedDate = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('ru-RU', {
        year: 'numeric', month: 'short', day: 'numeric'
    }).replace(/\./g, '').slice(0, -1);
}

const formattedName = (name: string) => {
    const openingIndex = name.indexOf('(');
    const closingIndex = name.indexOf(')');
    if (openingIndex !== -1 && closingIndex !== -1) {
        return name.substring(openingIndex + 1, closingIndex);
    }
    return '';
};


const Asteroid: FC<AsteroidProps> = ({ name, diameter, dangerous, date, distance }) => {
    return (
        <li className={styles.asteroid} >
            <p className={styles.date}>{formattedDate(date)}</p>
            <div className={styles.info}>
                <p className={styles.distance}>{formattedKilometers(distance)} км</p>
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
            <button className={styles.button}>ЗАКАЗАТЬ</button>
            {dangerous ? (
                <span className={styles.dangerous}>Опасен</span>
            ) : (
                <span className={styles.safe}>Безопасен</span>
            )}
        </li>
    )
}

export default Asteroid