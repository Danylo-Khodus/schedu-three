import './stylesheets/Header.css';

import URL from './URL';
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header () {

  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch(URL + '/profile',  {credentials: 'include'})
    .then(response => {
        response.json().then(profileInfo => {
          setUserInfo(profileInfo);
        });
    });
  }, []);

  function logout() {
    fetch(URL + '/logout', {
      credentials: 'include',
      method: 'POST'
    });
    setUserInfo(null);
    useNavigate('/');
  }

  const [shown, setShown] = useState(false);

  let menuRef = useRef();

  useEffect(() => {

    const closeDropdown = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setShown(false);
      }
    };

    document.body.addEventListener('click', closeDropdown);

    return () => document.body.removeEventListener('click', closeDropdown);
  });

  return (
    <header className={`container padding ${!userInfo ? 'welcome' : ''}`}>
      <Link to="/" className={`logo ${!userInfo ? 'welcome' : ''}`}>SchEdu</Link>
      <nav>
        {userInfo ? 
          <>
            <div className="account__nav" ref={menuRef}>
              <div className="account__btn" onClick={() => setShown(prev => !prev)}>
                <div className="profilePic">
                  <p className='letter'>{Array.from(`${userInfo?.firstName}`)[0]}</p>
                </div>
              </div>
              <div className= {`dropdown ${shown ? 'open' : 'close'}`}>
                <div className="account__btn">
                  <div className="profilePic">
                    <p className='letter'>{Array.from(`${userInfo?.firstName}`)[0]}</p>
                  </div>
                  <div className='profileInfo'>
                    <p className='profileName'>{userInfo?.firstName}</p>
                    <p className='userGroup'>  Клас: {userInfo?.group}</p>
                  </div>
                </div>
                <Link className="dropdown__anchor" to={"/profile"} onClick={() => setShown(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                  Профіль
                </Link>
                {userInfo?.perm === 'admin' ? 
                  <Link className="dropdown__anchor" to="/write" onClick={() => setShown(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Створити розклад
                  </Link>
                  :
                  <></>
                }
                <Link className="dropdown__anchor" to="/homework" onClick={() => setShown(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  Домашне завдання
                </Link>
                <a className="dropdown__anchor" onClick={logout}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  Вийти
                </a>
              </div>
            </div>
          </> :
          <>
            <Link className="btn" to="/login">Увійти</Link>
          </>
        }
      </nav>
    </header>
  );
}
