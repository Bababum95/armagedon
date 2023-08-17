import { IAsteroidData } from '@/interfaces/IAsteroidData';
import PageClientContent from '@/components/AsteroidsList/PageClientContent';

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
    <>
      <PageClientContent asteroidData={asteroidData} />
    </>
  )
}
