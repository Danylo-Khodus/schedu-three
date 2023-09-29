import {useState, useContext} from "react";
import {Navigate, Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function RegisterPage() {

    const {setUserInfo} = useContext(UserContext);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        group: '',
    });

    const group__options = [
        {label: "Обрати клас *...",value: "initial",},
        {label: "3-В",value: "3-В",},
        {label: "3-Г",value: "3-Г",},
    ];

    const [redirect, setRedirect] = useState(false);

    async function register(ev) {

        const blank = (userData.password === '' || userData.email === '' || userData.firstName === '' || userData.group === '');

        if (blank) {
            alert('Будь-ласка, вказуйте усю інформацію необхідну для реєстрації.');
        } else {
            ev.preventDefault();
            const response = await fetch('https://schedu-two.vercel.app/api/register', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {'Content-Type':'application/json'}
            });
            if (response.status === 200) {

                alert('Реєстрація пройшла успішно!');
                setRedirect(true);
                
            } else {
                alert('Нaведена електронна пошта вже використовується.');
            }
        }
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return(
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
    );
}