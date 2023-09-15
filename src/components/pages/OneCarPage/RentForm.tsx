import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from "react";
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');


import { RootState, AppDispatch } from '../../../app/store';
import styles from "./Rent.module.css";
import { addCarToUser } from '../../../features/userSlice';


const RentForm = ({ isOpen, closeModal, formData, handleInputChange }) => {

  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user);
  const [fieldsFilled, setFieldsFilled] = useState({
    city: true,
    rentalDate: true,
    phoneNumber: true,
    paymentMethod: true,
  });
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.city || !formData.rentalDate || !formData.phoneNumber || !formData.paymentMethod) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
    dispatch(addCarToUser(userData));
  }
  return (
  <div className={styles.container}>
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Аренда машины"
      className={styles.container}
    >
      <div>
        <h2 className={styles.h2}>Аренда машины</h2>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="city" className={styles.labels}>Город</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="rentalDate" className={styles.labels}>Дата аренды</label>
            <input
              type="date"
              id="rentalDate"
              name="rentalDate"
              value={formData.rentalDate}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber" className={styles.labels}>Номер телефона</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="paymentMethod" className={styles.labels}>Способ оплаты</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="card" className={styles.labels}>Кредитная карта</option>
              <option value="cash" className={styles.labels}>Наличные</option>
            </select>
          </div>
          <button className={styles.sendRent} type="submit">Отправить</button>
        </form>
      </div>
      <button className={styles.butRent} onClick={closeModal}>Закрыть</button>
    </ReactModal>
  </div>
  );
}

export default RentForm;