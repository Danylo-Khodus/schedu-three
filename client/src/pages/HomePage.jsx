import '../stylesheets/HomePage.css';

import URL from '../URL';
import {format} from 'date-fns';
import Schedule from "../Schedule";
import Filter from '../Filter';
import { Link, Navigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import { useContext, useEffect, useState } from "react";

export default function HomePage() {

    const [schedule, setSchedule] = useState([]);

    const {userInfo} = useContext(UserContext);

    const userGroup = userInfo?.group;

    useEffect(() => {
        fetch('https://schedu-three.vercel.app/' + '/schedule').then(response => {
            response.json().then(schedule => {
                setSchedule(schedule);
            });
        });
    }, []);

    const [selectedPeriod, setSelectedPeriod] = useState(format(new Date(), 'yyyy-MM-dd'));

    const filteredSchedule = schedule.filter((ev) => {
        if (ev.group.includes(userGroup) && ev.date.includes(selectedPeriod)) {return ev}
    });

    return(
        <div className='homepage__wrapper'>
            {userInfo ? 
                <>
                    <Filter handleCallback={(ev) => setSelectedPeriod(ev)} selected={selectedPeriod}/>
                    {filteredSchedule.length > 0 
                        ? 
                        filteredSchedule.map(post => <Schedule key={post._id} {...post} />)
                        :
                        <div className='weekend__wrapper'>
                            <h1 className='weekend'>На сьогодні, запланованих занять - немає.</h1>
                            <Link to='/homework' className='btn colored'>Переглянути д/з</Link>
                        </div>
                    }
                </> : <>
                    <Navigate to={'/login'}/>
                </>
            }
        </div>
    );
}