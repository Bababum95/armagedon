import { IAsteroidData } from '@/interfaces/IAsteroidData';

import styles from './page.module.css'
import Asteroid from '@/components/Asteroid/Asteroid';

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function getAsteroids() {
  const date = getToday()
  const response = await fetch(`${process.env.API_URL}/feed?start_date=${date}&api_key=${process.env.API_KEY}`)
  if (response.status !== 200) throw new Error('Failed to fetch asteroids')
  const data: IAsteroidData = await response.json()
  const asteroidData = Object.values(data.near_earth_objects).flat();
  return asteroidData
}

export default async function Home() {
  const asteroidData = await getAsteroids()

  return (
    <div>
    <h1 className={styles.title}>Ближайшие подлёты астероидов</h1>
    <ul className={styles.list}>
        {asteroidData.map((asteroid) => (
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
