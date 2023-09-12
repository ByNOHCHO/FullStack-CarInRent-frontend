import React from 'react';
import styles from './Catalog.module.css'
import { Link } from 'react-router-dom'
import CompareIcon from '@mui/icons-material/Compare';


interface CarCardProps {
  carsId: string,
  img: string;
  name: string;
  price: string;
  description: string;
  capacity: number;
}

const handleCompareClick = (e) => {
  e.stopPropagation();
}


const CarCard: React.FC<CarCardProps> = ({ img, name, price, description, capacity, carsId }) => {
  const shortDescription = description.split(' ').slice(0, 10).join(' ') + '...';

  return (
    <div className={styles.carCard}>
      <div><img className={styles.imgCar} src={`http://localhost:4444/assets/img/${img}`} alt={name} /></div>
      <div className={styles.info}>
        <div><h2>{name}</h2></div>
        <div>Price: {price}</div>
        <div>{shortDescription}</div>
        <div>Capacity: {capacity}</div>
      </div>
      <Link to={`/cars/${carsId}`} className={styles.link}>Перейти к модели</Link>
      <div className={styles.compareIcon} onClick={handleCompareClick}>
        <CompareIcon />
      </div>
    </div>
  );
}

export default CarCard;