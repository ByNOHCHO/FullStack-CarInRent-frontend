import React, { useState } from "react";
import styles from "./OneCarPage.module.css";
import RentForm from "./RentForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCarById,
  patchReviews,
  addReviews,
  fetchReviews,
  deletedReviews,
} from "../../../features/oneCarPageSlice";
import { AppDispatch, RootState } from "../../../app/store";
import { Carousel, CarouselItem } from "react-bootstrap";

const OneCarPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.oneCarPage.car);
  const reviews = useSelector((state: RootState) => state.oneCarPage.reviews);
  const token = useSelector((state: RootState) => state.application.token);
  const [review, setReviews] = React.useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    rentalDate: "",
    phoneNumber: "",
    paymentMethod: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function parseJWT(token) {
    if (typeof token !== "string") {
      // Обработка ошибки или возврат значения по умолчанию
      return null;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload).id;
  }
  const ownid = parseJWT(token);

  const handleSendReviews = (review: string) => {
    if (!token) {
      alert("Вы не авторизованы");
    } else {
      dispatch(addReviews({ review, carId, userId: ownid }));
    }
    setReviews("");
  };

  const { carId } = useParams();
  const handleOnChangeTextArea = (text: string) => {
    setReviews(text);
  };

  const handleDeleteReviews = (id, userer) => {
    reviews.map((item) => {
      if (ownid == userer) {
        dispatch(deletedReviews(id));
      }
    });
  };

  React.useEffect(() => {
    dispatch(fetchReviews());
    dispatch(getCarById(carId));
  }, [dispatch]);

  //   const user = users.find((user) => user._id === reviewss.user._id)

  const reviewCar = [reviews.find((item) => item.cars === cars._id)];

  return (
    <div className={styles.oneCarPage}>
      <div className={styles.car}>
        <div className={styles.carImg}>
          <Carousel>
          <CarouselItem className={styles.carusel}>
              <ul className={styles.hoverEffectScale}>
                <li>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:4444/assets/img/${cars.img}`}
                    alt="Second slide"
                  />
                </li>
              </ul>
            </CarouselItem>
            <CarouselItem className={styles.carusel}>
              <ul className={styles.hoverEffectScale}>
                <li>
                  <iframe
                    title="YouTube Video"
                    width="300"
                    height="300"
                    src={cars.video}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </li>
              </ul>
            </CarouselItem>
          </Carousel>
          <button onClick={openModal}>Арендовать</button>
          <RentForm
            isOpen={isModalOpen}
            closeModal={closeModal}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className={styles.carInfo}>
          <div className={styles.carName}>{`Модель: ${cars.name}`}</div>
          <div className={styles.carPrice}>{`Цена: ${cars.price}$`}</div>
          <div
            className={styles.carDescription}
          >{`Описание: ${cars.description}`}</div>
          <div
            className={styles.carCapacity}
          >{`Вместительность: ${cars.capacity}`}</div>
        </div>
      </div>

      <div className={styles.reviews}>
        <span>Коментарии</span>

        {reviews.some((item) => item.cars === cars._id) ? (
          reviews.map((item, index) => {
            if (item.cars === cars._id) {
              const isCurrentUserComment = item.user?._id === ownid;
              return (
                <div className={styles.review} key={index}>
                  <div className={styles.reviewUser}>{item.user?.login}</div>
                  <div className={styles.reviewText}>{item.text}</div>
                  <div className={styles.reviewFilter}>{reviewCar.item}</div>
                  {isCurrentUserComment && (
                    <button
                      className={styles.reviewButton}
                      onClick={() =>
                        handleDeleteReviews(item._id, item.user._id)
                      }
                    >
                      x
                    </button>
                  )}
                </div>
              );
            }
          })
        ) : (
          <div className={styles.noComments}>Нет комментариев</div>
        )}

        <div className={styles.addReviewsText}>Оставить коментарии</div>
        <textarea
          name=""
          value={review}
          onChange={(e) => handleOnChangeTextArea(e.target.value)}
          id={styles.textarea}
          cols="30"
          rows="5"
        ></textarea>
        <div className={styles.sendReviews}>
          <button disabled={!review} onClick={() => handleSendReviews(review)}>
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneCarPage;
