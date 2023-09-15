import styles from "./Rent.module.css";
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

const RentForm = ({ isOpen, closeModal, formData, handleInputChange }) => {
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