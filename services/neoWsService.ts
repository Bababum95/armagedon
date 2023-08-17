const apiURL = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const neoWsService = {
  async getAsteroids(page: number) {
    const today = new Date();
    const date = new Date(today.getTime() + (page - 1) * 24 * 60 * 60 * 1000);
    const formattedDate = formatDate(date);

    const response = await fetch(`${apiURL}/feed?start_date=${formattedDate}&end_date=${formattedDate}&api_key=${apiKey}`);
    if (response.status !== 200) throw new Error(`Failed to fetch asteroids from ${apiURL}`);
    const data = await response.json();
    return Object.values(data.near_earth_objects).flat();
  },
  async getAsteroid(id: string) {
    const response = await fetch(`${apiURL}/neo/${id}?api_key=${apiKey}`);
    if (response.status !== 200) throw new Error(`Failed to fetch asteroid ${id} from ${apiURL}`);
    const data = await response.json();
    return data;
  }
}


function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

