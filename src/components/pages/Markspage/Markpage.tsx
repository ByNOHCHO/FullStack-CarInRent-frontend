import React, { useState } from 'react';
import styles from './Markpage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { fetchMarks } from '../../../features/marksSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Markpage = () => {
    const dispatch = useDispatch()
    const marks = useSelector((state: RootState) => state.marks.marks)
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const [isActive, setIsActive] = useState<boolean>(false);


    const filteredCars = marks.filter(mark =>
        mark.mark.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchMarks())
    }, [])

    const navigate = useNavigate();

    const handleChooseMark = (id: string) => {
        navigate(`/marks/${id}`)
    }

    return (
        <div className={styles.marksContainer}>
            <div className={styles.findMark}>
                <input
                    type="text"
                    value={searchQuery}
                    placeholder='Выберите марку...'
                    onChange={handleSearchChange}
                    className={`${styles.searchInput} ${isActive ? styles.active : ''}`} 
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}/>
            </div>
            <div className={styles.cont}>
                <div className={styles.marksContainer_cont}>
                    {filteredCars.map((mark) => (
                        <div className={styles.marksBlock} onClick={() => handleChooseMark(mark._id)}>
                            <div className={styles.marksImg}>
                                <img src={`http://localhost:4444/assets/logo/${mark.img}`} />
                            </div>
                            <p>{mark.mark}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Markpage;