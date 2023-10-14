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

    // DISPLAYING LESSON INFO

    const [opened, setOpened] = useState(false);

    const [lesson, setLesson] = useState('');

    const [status, setStatus] = useState('');

    function openLink(link) {
        window.open(link, '_blank');
    };

    // HOMEWORK ASSIGNMENT  

    function postHomework(lesson) {
        const data = {
            status: 'assigned',
            student_id: userInfo?.id,
            student_fullName: `${userInfo?.lastName} ${userInfo?.firstName}`,
            group: userInfo?.group,
            teacher: lesson.teacher,
            subject: lesson.subject,
            homework: lesson.homework,
        };

        if (userInfo?.perm !== 'teacher') {
            if (lesson.homework !== '') {
                fetch(URL + '/api/homework', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type':'application/json'}
                });
            };
        }
    };

    return(
        <>
            {userInfo?.id ?
                <div className='homepage__wrapper'>
                    <Filter handleCallback={(ev) => setSelectedDate(ev)} selected={selectedDate}/>
                    {filteredSchedule.length > 0 
                        ? 
                            <div className='lessons__wrapper'>
                                <div className='lessons'>
                                    {filteredSchedule.map(post => 
                                        <Lesson key={post._id} 
                                                lesson={post} 
                                                handleCallback={({lesson, status})=>{
                                                    setLesson(lesson); 
                                                    setStatus(status); 
                                                    setOpened(true);
                                                }}
                                        />
                                    )}
                                </div>
                                <div className={`lesson__info ${opened && 'shown'}`}>
                                    <button className='btn close' onClick={()=>{setOpened(false)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <div className='image'>
                                        <h1>{lesson.subject}</h1>
                                    </div>
                                    <div className="info">
                                        <p><strong>Викладач:</strong><br/>{lesson.teacher}</p>
                                        <p><strong>Тема:</strong><br/>{lesson.theme}</p>
                                    </div>
                                    <div className="buttons">
                                        <button className={`btn colored ${lesson.presentation === '' && 'inactive'}`} 
                                                onClick={()=>{
                                                    openLink(lesson.presentation); 
                                                }}>
                                            Презентація
                                        </button>
                                        <button className={`btn colored ${status === 'soon' || status === 'ongoing' && status !== 'finished' ? '' : 'inactive'}`} 
                                                onClick={()=>{
                                                    openLink(lesson.link); 
                                                    postHomework(lesson);
                                                }}>
                                            Перейти
                                        </button>
                                    </div>
                                </div>
                            </div>
                        :
                            <div className='weekend__wrapper'>
                                <h1 className='weekend'>На сьогодні, запланованих занять - немає.</h1>
                                <Link to='/homework' className='btn colored'>Переглянути д/з</Link>
                            </div>
                    }
                </div>
            :
                <Navigate to={'/login'}/>
            }
        </>
    );
}
