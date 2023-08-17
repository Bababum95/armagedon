import { INearEarthObject } from "@/interfaces/IAsteroidData";
import { neoWsService } from "@/services/neoWsService";
import styles from './page.module.css';
import { formattedDate } from "@/utils/formattedDate";

interface AsteroidProps {
    params: {
        id: string;
    }
}

export default async function Asteroid({ params: { id } }: AsteroidProps) {
    const asteroidData = await neoWsService.getAsteroid(id) as INearEarthObject

    const millisec = new Date().getTime()
    let difference = Infinity
    let closeApproachData = asteroidData.close_approach_data[0]
    asteroidData.close_approach_data.forEach((el) => {
        const currentDifference = el.epoch_date_close_approach - millisec
        if (currentDifference > 0 && currentDifference < difference) {
            difference = currentDifference
            closeApproachData = el
        }
    })

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{asteroidData.name}</h1>
            <div className={styles.content}>
                <div className={styles.param}>
                    <div className={styles.label}>Ближайшее сближение</div>
                    <div className={styles.value}>{formattedDate(closeApproachData.close_approach_date_full)}</div>
                </div>
                <div className={styles.param}>
                    <div className={styles.label}>Расстояние</div>
                    <div className={styles.value}>{Math.trunc(Number(closeApproachData.miss_distance.kilometers)) + ' км'}</div>
                </div>
                <ul className={styles.list}>
                    <h3>Список всех сближений астеройда:</h3>
                    {asteroidData!.close_approach_data.map((convergence, index) => (
                        <li className={styles.item} key={index}>
                            <div className={styles.param}>
                                <div className={styles.label}>Дата</div>
                                <div className={styles.value}>{formattedDate(convergence.close_approach_date_full)}</div>
                            </div>
                            <div className={styles.param}>
                                <div className={styles.label}>Расстояние</div>
                                <div className={styles.value}>{Math.trunc(Number(convergence.miss_distance.kilometers)) + ' км'}</div>
                            </div>
                            <div className={styles.param}>
                                <div className={styles.label}>Орбита</div>
                                <div className={styles.value}>{convergence.orbiting_body}</div>
                            </div>
                            <div className={styles.param}>
                                <div className={styles.label}>Скорость</div>
                                <div className={styles.value}>{Math.trunc(Number(convergence.relative_velocity.kilometers_per_hour))} км/ч</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
