import '../stylesheets/ProfilePage.css';

import URL from '../URL';
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {

    const {userInfo, setUserInfo} = useContext(UserContext);

    const [userData, setUserData] = useState({
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        group: userInfo?.group,
    });

    const options = [
        {label: "Select...",value: "initial",},
        {label: "3-А",value: "3-А",},
        {label: "3-Б",value: "3-Б",},
        {label: "3-В", value: "3-В",},
    ];

    const [changing, setChanging] = useState(false);

    async function Update(ev) {

        ev.preventDefault();
        const response = await fetch('https://schedu-three.vercel.app' + '/api/profile', {
            method: 'PUT',
            body: JSON.stringify(userData),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });
        if (response.status === 200) {
            setUserInfo({
                ...userInfo, 
                firstName: userData.firstName,
                lastName: userData.lastName,
                group: userData.group,
            });
            setChanging(prev => !prev);
        } else {
            alert('Не вдалося зімінити інформацію Вашого профілю. Спробуйте пізніше.');
        }

    }

    const firstLetter = Array.from(`${userInfo?.firstName}`)[0];

    return (
        <>
            {userInfo ?
                <>
                    <h1 className='section__h1'>Мій профіль</h1>
                    <div className="profile__wrapper">
                        <div className="profileImage__wrapper">
                            <p className='letter'>{firstLetter}</p>
                        </div>
                        {changing && (
                                <form className="profileInfo__wrapper" onSubmit={Update}>
                                <div className="nameInfo__wrapper">
                                    <div className="name__wrapper">
                                        <h3 className="line__name">ІМ'Я</h3>
                                                <input type="text" 
                                                    name='firstName'
                                                    value={userData.firstName}
                                                    onChange={ev => setUserData({...userData,[ev.target.name]:ev.target.value})}/>
                                    </div>
                                    <div className="name__wrapper">
                                        <h3 className="line__name">ПРІЗВИЩЕ</h3>
                                                <input type="text" 
                                                    name='lastName'
                                                    value={userData.lastName}
                                                    onChange={ev => setUserData({...userData,[ev.target.name]:ev.target.value})}/>
                                    </div>
                                </div>
                                <div className="personsGroup__wrapper">
                                    <h3 className="line__name">КЛАС</h3>
                                            <input type="text" 
                                            name='group'
                                            value={userData.group}
                                            onChange={ev => setUserData({...userData,[ev.target.name]:ev.target.value})}/>
                                </div>
                                <button className="btn create-btn">Зберегти зміни</button>
                            </form>
                        )}
                        {!changing && (
                            <div className="profileInfo__wrapper" onSubmit={Update}>
                                <div className="nameInfo__wrapper">
                                    <div className="name__wrapper" onClick={() => setChanging(true)}>
                                        <h3 className="line__name">ІМ'Я</h3>
                                                <p className='firstName'>{userData.firstName}</p>
                                        <div className='line'></div>
                                    </div>
                                    <div className="name__wrapper" onClick={() => setChanging(true)}>
                                        <h3 className="line__name">ПРІЗВИЩЕ</h3>
                                                <p className="lastName">{userData.lastName}</p>
                                        <div className='line'></div>
                                    </div>
                                </div>
                                <div className="name__wrapper" onClick={() => setChanging(true)}>
                                    <h3 className="line__name">КЛАС</h3>
                                            <p className="personsGroup">{userData.group}</p>
                                    <div className='line'></div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
                :
                <Navigate to={'/login'} />
            }
        </>
    )
}
