import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../features/applicationSlise";
import { AppDispatch } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Sign.module.css";

const SignUp = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState<string>("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState<string>('Введите емайл');
  const [passwordError, setPasswordError] = useState('Введите пароль');
  const [formValid, setFormValid] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])

  const handleSignUp = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(authSignUp({ _id: "", login, password, email }));
    navigate('/SignIn')
  };

  const navigate = useNavigate()

  const handleEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    const valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!valid.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный емайл')
    } else {
      setEmailError('')
    }
  };

  const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3) {
      setPasswordError('давай еще')
      if (!e.target.value) {
        setPasswordError('Введите пароль')
      }
    } else {
      setPasswordError('')
    }

  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case "password":
        setPasswordDirty(true)
        break
    }
  }

  return (
    <div className={styles.author}>
      <div className={styles.authorinput}>
        <form className={styles.form} onSubmit={handleSignUp}>
          <h2 id={styles.h2}>Регистрация</h2>
          <input
            type="text"
            value={login}
            placeholder="name"
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            onBlur={e => handleBlur(e)}
            name="password"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => handlePassword(e)}
          />
          {(passwordDirty && passwordError) && <div className={styles.error}>{passwordError}</div>}
          <input
            onBlur={e => handleBlur(e)}
            name="email"
            value={email}
            placeholder="Enter your email..."
            onChange={(e) => handleEmail(e)}
          />
          {(emailDirty && emailError) && <div className={styles.error}>{emailError}</div>}
          <button disabled={!formValid} type="submit">Зарегистрироваться</button>
        </form>
        <div className={styles.but}>
          Уже есть аккаунт? <Link to="/SignIn" className={styles.sign}>Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
