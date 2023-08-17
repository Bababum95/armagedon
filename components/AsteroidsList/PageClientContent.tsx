'use client';
import { FC } from 'react';

import { INearEarthObject } from '@/interfaces/IAsteroidData';
import styles from './PageClientContent.module.css'

import Asteroid from "../Asteroid/Asteroid";

interface PageClientContentProps {
    asteroidData: INearEarthObject[]
}

const PageClientContent: FC<PageClientContentProps> = ({ asteroidData }) => {
    return (
        <div>
            <h1 className={styles.title}>Ближайшие подлёты астероидов</h1>
            <ul className={styles.list}>
                {asteroidData && asteroidData.map((asteroid) => (
                    <Asteroid
                        key={asteroid.id}
                        name={asteroid.name}
                        diameter={asteroid.estimated_diameter.kilometers.estimated_diameter_max}
                        dangerous={asteroid.is_potentially_hazardous_asteroid}
                        date={asteroid.close_approach_data[0].close_approach_date_full}
                        distance={asteroid.close_approach_data[0].miss_distance.kilometers}
                    />
                ))}
            </ul>
        </div>
    )
}

export default PageClientContent