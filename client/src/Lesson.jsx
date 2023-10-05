import URL from './URL';
import {format} from 'date-fns';
import { UserContext } from './UserContext';
import { useContext, useEffect, useState } from "react";

export default function Lesson (lesson) {

    const {userInfo} = useContext(UserContext);

    // HOMEWORK ASSIGNMENT  

    const [data, setData] = useState({
        status: 'assigned',
        user_id: userInfo?.id,
        group : userInfo?.group,
        subject: lesson.subject,
        homework: lesson.homework,
    });

    function postHomework() {
        if (userInfo?.perm !== 'teacher') {
            if (lesson.homework !== '') {
                fetch('https://schedu-three.vercel.app' + '/api/homework', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type':'application/json'}
                });
            };
        }
    };

    // STATUS CHANGE

    const [status, setStatus] = useState('');

    useEffect(()=>{
        const currentTime = new Date().getTime();
        const soonTime = new Date(lesson.beginTime).getTime() - 10*60*1000;

        if (currentTime >= soonTime && !(currentTime >= new Date(lesson.beginTime).getTime())) {
            setStatus('soon');
        } else if (currentTime >= new Date(lesson.beginTime).getTime() && !(currentTime >= new Date(lesson.endTime).getTime()))  {
            setStatus('ongoing');
        }  else if (currentTime >= new Date(lesson.endTime).getTime()) {
            setStatus('finished');
        }
    },[]);

    setInterval(()=>{
        const currentTime = format(new Date(), 'dd.MM.yyyy HH:mm:ss');
        const soonTime = format(new Date(lesson.beginTime).getTime() - 10*60*1000, 'dd.MM.yyyy HH:mm:ss');

        if (currentTime === soonTime) {
            window.location.reload();
        } else if (currentTime === format(new Date(lesson.beginTime), 'dd.MM.yyyy HH:mm:ss'))  {
            window.location.reload();
        } else if (currentTime === format(new Date(lesson.endTime), 'dd.MM.yyyy HH:mm:ss')) {
            window.location.reload();
        }

    },1000);

    // UI FUNCTIONS

    const [opened, setOpened] = useState(false);

    function openLink(link) {
        window.open(link, '_blank');
    };

    return (
        <>
            {lesson.subject ? 
                <div className='lesson__wrapper'>
                    <div className={`status__dot ${status}`}></div>
                    <div className={`lesson ${opened ? 'opened' : ''}`}>
                        <div className="lesson__preview" onClick={()=>{setOpened(prev=>!prev)}}>
                            <div className="name">
                                {userInfo?.perm === 'teacher' && 
                                <p>{lesson.group}</p>
                                }
                                <p>{lesson.subject}</p>
                            </div>
                            <div className="time">
                                <div className="start">{format(new Date(lesson.beginTime), 'H:mm')}</div>
                                <div className="end">{format(new Date(lesson.endTime), 'H:mm')}</div>
                            </div>
                        </div>
                        {opened && 
                            <div className="lesson__info">
                                <button className={`btn colored ${!lesson.presentation ? 'inactive' : ''}`} onClick={()=>{openLink(lesson.presentation)}}>Презентація</button>
                                <button className={`btn colored ${(status === 'soon' || status === 'ongoing') ? '' : 'inactive'}`} onClick={()=>{postHomework(); openLink(lesson.link);}}>Перейти</button>
                            </div>
                        }
                    </div>
                </div> : <></>
            }
        </>
    )
}
