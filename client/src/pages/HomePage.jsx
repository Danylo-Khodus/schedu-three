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

    // GETTING SCHEDULE

    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetch(URL + '/api/schedule').then(response => {
            response.json().then(schedule => {
                setSchedule(schedule);
            });
        });
    }, []);

    // FILTERING THE DATA

    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const filteredSchedule = schedule.filter((ev) => {

        const fullName = `${userInfo?.lastName} ${userInfo?.firstName}`;

        if (userInfo?.perm === 'teacher') {
            if (ev.teacher.includes(fullName) && ev.date.includes(selectedDate)) {return ev}
        } else {
        if (ev.group.includes(userInfo?.group) && ev.date.includes(selectedDate)) {return ev}
        }
    });

    return(
        <>
            {!userInfo?.id ?
                <Navigate to={'/login'}/>
                :
                <div className='homepage__wrapper'>
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
                </div>
            }
        </>
    );
}
