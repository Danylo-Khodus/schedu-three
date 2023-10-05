import '../stylesheets/HomePage.css';

import URL from '../URL';
import {format} from 'date-fns';
import Lesson from "../Lesson";
import Filter from '../Filter';
import { Link, Navigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import { useContext, useEffect, useState } from "react";

export default function HomePage() {

    const {userInfo} = useContext(UserContext);

    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetch('https://schedu-three.vercel.app' + '/api/schedule').then(response => {
            response.json().then(schedule => {
                setSchedule(schedule);
            });
        });
    }, []);

    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const filteredSchedule = schedule.filter((ev) => {
        if (ev.group.includes(userInfo?.group) && ev.date.includes(selectedDate)) {return ev}
    });

    const [lessonInfo, setLessonInfo] = useState('');

    return(
        <div className='homepage__wrapper'>
            {userInfo ? 
                <>
                    <Filter handleCallback={(ev) => setSelectedDate(ev)} selected={selectedDate}/>
                    {filteredSchedule.length > 0 
                        ? 
                            <div className='lessons'>
                                {filteredSchedule.map(post => <Lesson key={post._id} {...post} />)}
                            </div>
                        :
                        <div className='weekend__wrapper'>
                            <h1 className='weekend'>На сьогодні, запланованих занять - немає.</h1>
                            <Link to='/homework' className='btn colored'>Переглянути д/з</Link>
                        </div>
                    }
                </> 
                : <Navigate to={'/login'}/>
            }
        </div>
    );
}
