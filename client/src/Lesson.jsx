import {format} from 'date-fns';
import { UserContext } from './UserContext';
import { useContext, useState } from "react";

export default function Lesson ({lesson, last, handleCallback}) {

    const {userInfo} = useContext(UserContext);

    // STATUS CHANGE

    const [status, setStatus] = useState('');

    setInterval(()=>{
        const currentTime = new Date().getTime();
        const soonTime = new Date(lesson.beginTime).getTime() - 10*60*1000;

        if (currentTime >= soonTime && !(currentTime >= new Date(lesson.beginTime).getTime())) {
            setStatus('soon');
        } else if (currentTime >= new Date(lesson.beginTime).getTime() && !(currentTime >= new Date(lesson.endTime).getTime()))  {
            setStatus('ongoing');
        }  else if (currentTime >= new Date(lesson.endTime).getTime()) {
            setStatus('finished');
        }
    },100);

    return (
        <>
            {lesson.subject ? 
                <div className='lesson__wrapper' onClick={()=>{handleCallback({lesson, status})}}>
                    <div className={`status__dot ${status} ${last && 'last'}`}></div>
                    <div className='lesson'>
                        <div className="lesson__preview">
                            <div className="name">
                                {userInfo?.perm === 'teacher' && 
                                <p className='group'>{lesson.group}</p>
                                }
                                <p className='subject'>{lesson.subject}</p>
                            </div>
                            <div className="time">
                                <div className="start">{format(new Date(lesson.beginTime), 'H:mm')}</div>
                                <div className="end">{format(new Date(lesson.endTime), 'H:mm')}</div>
                            </div>
                        </div>
                    </div>
                </div> : <></>
            }
        </>
    )
}
