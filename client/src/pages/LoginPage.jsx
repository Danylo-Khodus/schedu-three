import '../stylesheets/LoginPage.css';

import { URL } from '../App';
import { useState, useContext } from "react";
import {Navigate, Link} from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {

    // CHECKING IF THE USER IS LOGGED IN

    const { infoLoading, userInfo, setUserInfo } = useContext(UserContext);

    // INPUTS CONSTRUCTIONS

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    // LOGGING IN

    async function login(ev) {

        if (userData.email !== '' && userData.password !== '') {
            
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
                response.json().then(message => {
                    alert(message);
                });
            }

        } else {
            alert('Будь-ласка, вкажіть свою поштову адресу та пароль для входу.');
        }
    }

    return(
        <>
            {userInfo?.id ?
                <Navigate to={'/'}/>
            :
                <> 
                    <div className='login__page__wrapper'>
                        {infoLoading ?
                            <div className='screen__center'>
                                <div className="lds-ellipsis white"><div></div><div></div><div></div><div></div></div>
                            </div>
                        :
                            <form className="login" onSubmit={login}>
                                <h1 className='section__title'>Вхід</h1>
                                <div className='login__inputs'>
                                    <input type="email" 
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
                            </form>
                        }
                    </div>     
                </>
            }
        </>
    );
}
