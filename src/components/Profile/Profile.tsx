import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { deleteUser, oneUser } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css'


const Profile = () => {
  const user = useSelector((state: RootState) => state.user.users); // Получаем информацию о пользователе из Redux
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.application.token)
  const navigate = useNavigate()
  const car


  useEffect(() => {
    function parseJWT(token: string) {
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
      return JSON.parse(jsonPayload).id
    }
    const id = parseJWT(token)
    dispatch(oneUser(id))
  }, [])

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id))
    localStorage.removeItem('token')
    window.location.reload()
    navigate('/')
    location.reload()
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.headerText}>Ваш Личный кабинет</h2>
      <div className={styles.card}>
        <div>
          <p className={styles.userName}>Никнейм: {user.login}</p>
        </div>
        <div>
          <p className={styles.userEmail}>Ваш Email: {user.email}</p>
        </div>
        <button onClick={() => handleDelete(user._id)} className={styles.deletedUserButton}>Удалить пользователя</button>
      </div>
    </div>
  );
};

export default Profile;
