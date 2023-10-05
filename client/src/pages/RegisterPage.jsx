import URL from '../URL';
import { useState, useContext} from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";

export default function RegisterPage() {

    const {userInfo} = useContext(UserContext);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        group: '',
        perm: '',
    });

    const group__options = [
        {label: "Обрати клас *...",value: "initial",},
        {label: "3-В",value: "3-В",},
        {label: "3-Г",value: "3-Г",},
    ];

    async function register(ev) {

        const blank = (userData.password === '' || userData.email === '' || userData.firstName === '' || userData.group === '');

        if (blank) {
            alert('Будь-ласка, вказуйте усю інформацію необхідну для реєстрації.');
        } else {
            ev.preventDefault();
            const response = await fetch(URL + '/api/register', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {'Content-Type':'application/json'},
            });
            if (response.status === 200) {
                alert('Реєстрація пройшла успішно!');
            } else {
                alert('Нaведена електронна пошта вже використовується.');
            }
        }
    }

    return(
        <>
            {!userInfo ?
                <div className="registration__page__wrapper">
                    <form className="register" onSubmit={register}>
                        <h1 className="section__title">Реєстрація</h1>
                        <div className="register__inputs">
                            <div className="name__input__wrapper">
                                <input type="text" 
                                    placeholder="Ім'я *"
                                    name="firstName"
                                    onChange={ev => setUserData({...userData,[ev.target.name]:ev.target.value})}/>
                                <input type="text" 
                                    placeholder="Прізвище"
                                    name="lastName"
                                    onChange={ev => setUserData({...userData,[ev.target.name]:ev.target.value})}/>
                            </div>
                            <select name='group'
                                    onChange={(ev)=> setUserData({
                                        ...userData,
                                        [ev.target.name]:ev.target.value,})}>
                                {group__options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <input type="text" 
                                placeholder="Електронна пошта *"
                                name="email"
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
                :
                <Navigate to={'/'} />
            }
        </>
    );
}
