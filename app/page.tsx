'use client';
import { useEffect, useState, useRef } from 'react';

import { INearEarthObject } from '@/interfaces/IAsteroidData';
import { neoWsService } from '@/services/neoWsService';
import styles from './page.module.css';

import Asteroid from '@/components/Asteroid/Asteroid';
import Cart from '@/components/Cart/Cart';

const formattedKilometers = (distance: string) => {
  return parseFloat(distance).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).replace(/\,/g, ' ')
}

export default function Home() {
  const wrapperRef = useRef<HTMLTableElement>(null);
  const [asteroidData, setAsteroidData] = useState<INearEarthObject[]>([]);
  const [cartList, setCartList] = useState<INearEarthObject[]>([]);
  const [cartCount, setCartCount] = useState('Корзина пуста');
  const [cart, setCart] = useState(false);
  const [page, setPage] = useState(1);
  const [kilometers, setKilometers] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    neoWsService.getAsteroids(page)
      .then((data) => {
        setAsteroidData([...asteroidData, ...data as INearEarthObject[]]);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    let cartText = 'Корзина пуста';
    if (cartList.length === 1) cartText = '1 астероид';
    if (cartList.length > 1) cartText = `${cartList.length} астероида`;
    if (cartList.length > 4) cartText = `${cartList.length} астероидов`;
    setCartCount(cartText);
  }, [cartList]);

  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  })
  const onScroll = () => {
    if (!loading && wrapperRef.current!.getBoundingClientRect().height - window.scrollY < window.innerHeight) {
      setPage(page + 1);
      setLoading(true);
    }
  }

  const addToCart = (asteroid: INearEarthObject) => {
    setCartList((prevList) => [...prevList, asteroid]);
  };

  const submitCart = () => {
    setAsteroidData(cartList);
    setCart(true);
  };

  return (
    <>
      <div className={styles.container} ref={wrapperRef}>
        <h1 className={styles.title}>
          {!cart ? 'Ближайшие подлёты астероидов' : 'Заказ отправлен!'}
        </h1>
        {!cart && (
          <div>
            <p
              className={`${styles.distance} ${kilometers && styles.active}`}
              onClick={() => setKilometers(true)}
            >
              в километрах
            </p>
            <span className={styles.separator}>|</span>
            <p
              className={`${styles.distance} ${!kilometers && styles.active}`}
              onClick={() => setKilometers(false)}
            >
              в лунных орбитах
            </p>
          </div>
        )}
        <ul className={styles.list}>
          {asteroidData.map((asteroid) => (
            <Asteroid
              key={asteroid.id}
              addToCart={addToCart}
              asteroid={asteroid}
              showButton={!cart}
              inCart={cartList.includes(asteroid)}
              name={asteroid.name}
              diameter={asteroid.estimated_diameter.kilometers.estimated_diameter_max}
              dangerous={asteroid.is_potentially_hazardous_asteroid}
              date={asteroid.close_approach_data[0].close_approach_date_full}
              distance={
                kilometers ? `${formattedKilometers(asteroid.close_approach_data[0].miss_distance.kilometers)} км` :
                  `${Math.round(Number(asteroid.close_approach_data[0].miss_distance.lunar))} лунных орбит`
              }
            />
          ))}
        </ul>
        {loading && <span>Загрузка...</span>}
      </div>
      {!cart && (<Cart count={cartCount} submitCart={submitCart} />)}
    </>
  );
}
