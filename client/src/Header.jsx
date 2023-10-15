import './stylesheets/Header.css';

import URL from './URL';
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header () {

  const {userInfo, setUserInfo} = useContext(UserContext);

  useEffect(() => {
    fetch(URL + '/api/profile',  {credentials: 'include'})
        .then(response => {
        response.json().then(profileInfo => {
          setUserInfo(profileInfo);
        });
    });
  }, []);

  function logout() {
     const response = fetch(URL + '/api/logout', {
      credentials: 'include',
      method: 'POST'
    });
    if (response) {
      setUserInfo(null);
    }
  }

  const [shown, setShown] = useState(false);

  const [notify, setNotify] = useState(false);

  let menuRef = useRef();

  useEffect(() => {

    const closeDropdown = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setShown(false);
        setNotify(false);
      }
    };

    document.body.addEventListener('click', closeDropdown);

    return () => document.body.removeEventListener('click', closeDropdown);
  });

  return (
    <header className='container padding'>
      <Link to="/" className={`logo ${!userInfo ? 'welcome' : ''}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
        </svg>
        SchEdu
      </Link>
      <nav ref={menuRef}>
        {userInfo && (
          <>
            <svg onClick={() => {setNotify(prev => !prev); setShown(false);}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="bell">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <div className="account__nav">
              <div className="account__btn" onClick={() => {setShown(prev => !prev); setNotify(false);}}>
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
              <div className= {`dropdown notification ${notify ? 'open' : 'close'}`}>
                <h1>Сповіщення</h1>
                <div className="line"></div>
                <div className="notifications">
                  <div className="notification">
                    <div className="notification__status__dot"></div>
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    <div className="info">
                      <p>Було додано нове домашне завдання з <strong>{'Математика'}</strong></p>
                      <time>{'1 годину тому'}</time>
                    </div>
                  </div>
                  <div className="notification">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                    </div>
                    <div className="info">
                      <p>Скоро почнеться урок <strong>{'Українська мова'}</strong></p>
                      <time>{'50 хвилин тому'}</time>
                    </div>
                  </div>
                  <div className="notification">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                    </div>
                    <div className="info">
                      <p>Почався урок <strong>{'Українська мова'}</strong></p>
                      <time>{'40 хвилин тому'}</time>
                    </div>
                  </div>
                  <div className="notification">
                    <div className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                    </div>
                    <div className="info">
                      <p>Було додано нове домашне завдання з <strong>{'Українська мова'}</strong></p>
                      <time>{'1 секунду тому'}</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
