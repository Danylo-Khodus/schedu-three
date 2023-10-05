import '../stylesheets/LoginPage.css';

import URL from '../URL';
import { useState, useContext } from "react";
import {Navigate, Link} from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {

    const {userInfo, setUserInfo} = useContext(UserContext);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    async function login(ev) {

        const requirements = (
            userData.email !== '' && 
            userData.password !== ''
        );

        if (requirements) {
            
            ev.preventDefault();
            const response = await fetch(URL + '/api/login', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {'Content-Type':'application/json'},
                credentials: 'include',
            });

            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                });

            } else {
                alert('Невірна поштова адреса або пароль. Будь-ласка, спробуйте знову.');
            }

        } else {
            alert('Будь-ласка, вкажіть свою поштову адресу та пароль для входу.');
        }
    }

    return(
        <>
            {!userInfo ? 
                <div className='login__page__wrapper'>
                    <form className="login" onSubmit={login}>
                        <h1 className='section__title'>Вхід</h1>
                        <div className='login__inputs'>
                            <input type="text" 
                                placeholder="Електронна пошта *" 
                                name='email'
                                onChange={(ev) => setUserData({
                                    ...userData,
                                    [ev.target.name]:ev.target.value,
                                })}/>
                            <input type="password" 
                                placeholder="Пароль *" 
                                name='password'
                                onChange={(ev) => setUserData({
                                    ...userData,
                                    [ev.target.name]:ev.target.value,
                                })}/>
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
                :
                <Navigate to={'/'}/>
            }
        </>
    );
}
