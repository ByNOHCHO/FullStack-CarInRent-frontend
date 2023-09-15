import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchModels } from '../../../features/modelsSlice';
import { Link } from 'react-router-dom'
import CompareIcon from '@mui/icons-material/Compare';
import { Tooltip, IconButton } from '@mui/material';
import styles from './OneMarkPage.module.css'
import { AppDispatch, RootState } from '../../../app/store';



const OneMarkPage = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchModels())
    }, [dispatch])

    const cars = useSelector((state: RootState) => state.Cars)
    const { markId } = useParams();
    const filteredCars = cars.models.filter((car) => car.mark._id === markId)

    const handleCompareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    }

    return (
        <div className={styles.container}>
            {filteredCars.map((car) => {
                return (
                    <div className={styles.carCard} key={car._id}>
                        <div><img className={styles.imgCar} src={`http://localhost:4444/assets/img/${car.img}`} /></div>
                        <div className={styles.info}>
                            <div><h2>{car.name}</h2></div>
                            <div>Цена: {car.price} $</div>
                            <div>
                                <p id={styles.desc}>
                                    {car.description}
                                </p>
                            </div>
                            <div>Вместительность: {car.capacity}</div>
                        </div>
                        
                        <Link to={`/cars/${car._id}`} className={styles.link}>Перейти к модели</Link>
                    </div>
                )
            })}
        </div>
    );
};

export default OneMarkPage;