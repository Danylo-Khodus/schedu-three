import {useState} from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        firstName: 'новачок',
        lastName: '',
        group: '--',
        image: '',
    });

    async function register(ev) {

        const blank = (userData.password == '');

        if (blank) {
            alert('Please enter username and password to sign up.');
        } else {

            const length = userData.username.length;

            if (length >= 4 && length <= 20) {
                ev.preventDefault();
                const response = await fetch('http://localhost:4000/register', {
                    method: 'POST',
                    body: JSON.stringify({userData}),
                    headers: {'Content-Type':'application/json'}
                });
                if (response.status === 200) {
                    alert('Registration successful!');
                } else {
                    alert('Registration failed! Username is already occupied.');
                }
            } else {
                alert('Username should not be less then 4 and more then 20 characters long.');
            }
        }
    }

    return(
        <div className="registration__page__wrapper">
        <form className="register" onSubmit={register}>
            <h1 className="section__title">Реєстрація</h1>
            <div className="register__inputs">
                <input type="text" 
                    placeholder="Ім'я *"
                    name="username"
                    onChange={ev => setUserData({...userData,[ev.target.name]:ev.target.value})}/>
                <input type="password" 
                    placeholder="Пароль *"
                    name="password"
                    onChange={ev => setUserData({...userData,[ev.target.name]:ev.target.value})}/>
            </div>
            <button className="btn login-register-btn" >Створити акаунт</button>
            <div className="logging-in">
                <p>Вже маєте акаунт?</p>
                <Link className="login__link" to="/login">Увійти</Link>
            </div>
        </form>
        </div>
    );
}