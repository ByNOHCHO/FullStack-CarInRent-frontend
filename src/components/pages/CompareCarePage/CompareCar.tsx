import React from 'react'
import styles from './CompareCar.module.css'

function CompareCar() {
    return (
        <div className={styles.maintenanceContainer}>
            <h1 className={styles.maintenanceText}>Ведутся технические работы</h1>
            <div className={styles.maintenanceIcons}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYPTHxsb6CFcpl5Qdt1dpAoPoEeqxKytpDcPGAOaqAfA&s" alt="Молоток и Гаечный ключ" className={styles.maintenanceIcon} />
            </div>
        </div>
    );
}

export default CompareCar;