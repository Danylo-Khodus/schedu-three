import '../stylesheets/ProfilePage.css';

import { useEffect, useState, useRef } from "react";
import { UserContext } from "../UserContext";

export default function ProfilePage() {

    const [userData, setUserData] = useState({
        image: '',
        firstName: '',
        lastName: '',
        group: '',
    });

    useEffect(() => {
      fetch('http://localhost:4000/profile',  {credentials: 'include'})
      .then(response => {
          response.json().then(profileInfo => {
            setUserData(profileInfo);
          });
      });
    }, []); 

    const options = [
        {label: "Select...",value: "initial",},
        {label: "3-А",value: "3-А",},
        {label: "3-Б",value: "3-Б",},
        {label: "3-В", value: "3-В",},
    ];

    // const  inputRef = useRef();

    const [changing, setChanging] = useState(false);

    // const [imageChanged, setImageChanged] = useState(false);

    // function handleFileInput(ev) {
    //     setImageChanged(true);
    //     setUserData({...userData, [ev.target.name]: ev.target.files[0]});
    // }

    async function Update(ev) {
        const data = new FormData();
        // data.set('image', userData.image);
        data.set('firstName', userData.firstName);
        data.set('lastName', userData.lastName);
        data.set('group', userData.group);

        ev.preventDefault();
        const response = await fetch('http://localhost:4000/profile', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.status === 200) {
            setChanging(prev => !prev);
            window.location.reload();
        } else {
            alert('Change has failed! Try again later.');
        }

    }

    return (
        <>
            <h1 className='section__h1'>Мій профіль</h1>
            <div className="profile__wrapper">
                {/* <div className="profileImage__wrapper">
                    <img className='profileImage' src={imageChanged ? URL.createObjectURL(userData.image) : 'http://localhost:4000/'+ userData.image} alt="image" onClick={() => {inputRef.current.click(); setChanging(true);}}/>
                    <input type="file"
                           name='image'
                           style={{ display: 'none'}}
                           ref={inputRef} 
                           onChange={handleFileInput}/>
                </div> */}
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
                            <div className="name__wrapper">
                                <h3 className="line__name">ІМ'Я</h3>
                                        <p className='firstName'>{userData.firstName}
                                        </p>
                                <div className='line'></div>
                            </div>
                            <div className="name__wrapper">
                                <h3 className="line__name">ПРІЗВИЩЕ</h3>
                                        <p className="lastName">{userData.lastName}
                                        </p>
                                <div className='line'></div>
                            </div>
                        </div>
                        <div className="personsGroup__wrapper">
                            <h3 className="line__name">КЛАС</h3>
                                    <p className="personsGroup">{userData.group}
                                    </p>
                            <div className='line'></div>
                        </div>
                        <button className="btn create-btn" onClick={() => setChanging(prev => !prev)}>Змінити</button>
                    </div>
                )}
            </div>
        </>
    )
}