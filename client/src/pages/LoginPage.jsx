import '../stylesheets/LoginPage.css';

import URL from '../URL';
import { useState, useContext } from "react";
import {Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const [redirect, setRedirect] = useState(false);

    const {setUserInfo} = useContext(UserContext);

    async function login(ev) {

        const requirements = (userData.username !== '' && userData.password !== '');

        if (requirements) {
            ev.preventDefault();

            const response = await fetch(URL + '/login', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {'Content-Type':'application/json'},
                credentials: 'include',
            });
            
            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                    setRedirect(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                });

            } else {
                alert('Невірна поштова адреса або пароль. Будь-ласка, спробуйте знову.');
            }

        } else {
            alert('Будь-ласка, вкажіть свою поштову адресу та пароль для входу.');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    function processChange(ev) {
        setUserData({
            ...userData,
            [ev.target.name]:ev.target.value,
        });
    }

    return(
        <div className='login__page__wrapper'>
        <form className="login" onSubmit={login}>
            <h1 className='section__title'>Вхід</h1>
            <div className='login__inputs'>
                <input type="text" 
                    placeholder="Електронна пошта *" 
                    name='email'
                    onChange={processChange}/>
                <input type="password" 
                    placeholder="Пароль *" 
                    name='password'
                    onChange={processChange}/>
            </div>
            <button className="btn login-register-btn" >Увійти</button>
            <div className="registration">
                <p>Досі немає акаунту?</p>
                <Link className="register__link" to="/register">Створити акаунт</Link>
            </div>
            <div className="forgot__password">
                <Link className="forgot__password__link" to="/password-recovery">Забули пароль?</Link>
            </div>
        </form>
        </div>
    );
}