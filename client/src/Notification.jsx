import URL from "./URL";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import moment from 'moment';

export default function Notifications ({notify, setNotify, handleCallback}) {

    // GETTING NOTIFICATIONS

    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        fetch(URL + '/api/notifications',  {credentials: 'include'})
        .then(response => {
            response.json().then(notifications => {
                setNotifications(notifications);
            });
        });
    },[]);

    // GETTING UNSEEN NOTIFICATIONS

    const newNotifications = notifications.filter((ev)=>{
        if (ev.seen === 'false') {return ev}
    });

    // NOTIFICATION COMPONENT

    function Notification ({_id, seen, message, subject, createdAt, link}) {

        const time = moment(createdAt).fromNow();

        const [redirect, setRedirect] = useState(false);

        // UPDATING SEEN STRING

        async function updateNotification () {
            if (seen !== 'true') {
                await fetch(URL + '/api/notifications', {
                    method: 'PUT',
                    body: JSON.stringify({ _id }),
                    headers: {'Content-Type':'application/json'},
                });
                setRedirect(true);
            } else {
                setRedirect(true);
            }
        };

        // REDIRECTING

        if (redirect) {
            return <Navigate to={link}/>
        }

        return (
            <div className="notification" onClick={()=>{updateNotification()}}>
                {seen === 'false' && 
                    <div className="notification__status__dot"></div>
                }
                <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                </div>
                <div className="info">
                    <p>{message} <strong>{subject}</strong></p>
                    <time>{time}</time>
                </div>
            </div>
        );
    };
    
    return (
        <div className="notification__bell" onClick={() => {setNotify(prev => !prev); handleCallback(false);}}>
            {newNotifications.length > 0 && <div className='notification__status__dot'></div>}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="bell">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <div className= {`dropdown notification ${notify ? 'open' : 'close'}`}>
                <h1>Сповіщення</h1>
                <div className="line"></div>
                <div className="notifications">
                    {notifications.map(notification => <Notification key={notification._id} {...notification}/>)}
                </div>
            </div>
        </div>
    );
}