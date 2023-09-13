import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchModels } from '../../../features/modelsSlice';
import { Link } from 'react-router-dom'
import CompareIcon from '@mui/icons-material/Compare';
import { Tooltip, IconButton } from '@mui/material';
import styles from './OneMarkPage.module.css'


const OneMarkPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchModels())
    }, [])

    const cars = useSelector((state: RootState) => state.Cars)
    const { markId } = useParams()
    const filteredCars = cars.models.filter((car) => car.mark._id === markId)

    const handleCompareClick = (e) => {
        e.stopPropagation();
      }

    return (
        <div>
            {filteredCars.map((car) => {
                return (
                    <div className={styles.carCard}>
                        <div><img className={styles.imgCar} src={`http://localhost:4444/assets/img/${car.img}`}/></div>
                        <div className={styles.info}>
                            <div><h2>{car.name}</h2></div>
                            <div>Price: {car.price}</div>
                            <div>{car.shortDescription}</div>
                            <div>Capacity: {car.capacity}</div>
                        </div>
                        <div className={styles.compareIconContainer}>
                            <Tooltip title="Сравнить" placement="top">
                                <IconButton onClick={handleCompareClick}>
                                    <CompareIcon className={styles.compareIcon} />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <Link to={`/cars/${car._id}`} className={styles.link}>Перейти к модели</Link>
                    </div>
                )
            })}
        </div>
    );
};

export default OneMarkPage;