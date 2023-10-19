import '../stylesheets/HomePage.css';

import URL from '../URL';
import {format} from 'date-fns';
import Lesson from "../Lesson";
import Filter from '../Filter';
import { Link, Navigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import { useContext, useEffect, useState } from "react";
import LessonInfo from '../LessonInfo';

export default function HomePage() {

    const [loading, setLoading] = useState(false);

    const {userInfo} = useContext(UserContext);

    // GETTING SCHEDULE

    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(URL + '/api/schedule', {credentials: 'include'})
        .then(response => {
            response.json().then((schedule) => {
                setSchedule(schedule);
            });
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    // FILTERING THE DATA

    const lessons = schedule.filter((ev)=>{
        if (ev.date.includes(selectedDate)) {
            return (ev);
        }
    });

    const [one, two, three, four, five, six] = lessons;

    // DISPLAYING LESSON INFO

    const [opened, setOpened] = useState(false);

    const [status, setStatus] = useState('');

    const [edit, setEdit] = useState(false);

    const [lesson, setLesson] = useState('');

    return(
        <>
            {userInfo?.id ?
                <div className='homepage__wrapper'>
                    <Filter handleCallback={(ev) => {setSelectedDate(ev); setEdit(false)}} selected={selectedDate}/>
                    {loading ? 
                        <div className='screen__center'>
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                    :
                        <>
                            {lessons.length > 0 
                                ? 
                                    <div className='lessons__wrapper'>
                                        <div className='lessons'>
                                                <Lesson key={one._id} 
                                                        last={!two ? true : false}
                                                        lesson={one} 
                                                        handleCallback={({lesson, status})=>{
                                                            setEdit(false);
                                                            setLesson(lesson); 
                                                            setStatus(status); 
                                                            setOpened(true);
                                                        }}
                                                />
                                            {two && (
                                                <Lesson key={two._id} 
                                                        last={!three ? true : false}
                                                        lesson={two} 
                                                        handleCallback={({lesson, status})=>{
                                                            setEdit(false);
                                                            setLesson(lesson); 
                                                            setStatus(status); 
                                                            setOpened(true);
                                                        }}
                                                />
                                            )}                                    
                                            {three && (
                                                <Lesson key={three._id} 
                                                        last={!four ? true : false}
                                                        lesson={three} 
                                                        handleCallback={({lesson, status})=>{
                                                            setEdit(false);
                                                            setLesson(lesson); 
                                                            setStatus(status); 
                                                            setOpened(true);
                                                        }}
                                                />
                                            )}                                    
                                            {four && (
                                                <Lesson key={four._id} 
                                                        last={!five ? true : false}
                                                        lesson={four} 
                                                        handleCallback={({lesson, status})=>{
                                                            setEdit(false);
                                                            setLesson(lesson); 
                                                            setStatus(status); 
                                                            setOpened(true);
                                                        }}
                                                />
                                            )}                                    
                                            {five && (
                                                <Lesson key={five._id} 
                                                        last={!six ? true : false}
                                                        lesson={five} 
                                                        handleCallback={({lesson, status})=>{
                                                            setEdit(false);
                                                            setLesson(lesson); 
                                                            setStatus(status); 
                                                            setOpened(true);
                                                        }}
                                                />
                                            )}
                                            {six && (
                                                <Lesson key={six._id} 
                                                        last={true}
                                                        lesson={six} 
                                                        handleCallback={({lesson, status})=>{
                                                            setEdit(false);
                                                            setLesson(lesson); 
                                                            setStatus(status); 
                                                            setOpened(true);
                                                        }}
                                                />
                                            )}
                                        </div>
                                        <LessonInfo opened={opened} 
                                                    status={status} 
                                                    edit={edit}
                                                    data={lesson === '' ? one : lesson} 
                                                    handleOpen={(ev)=>{setOpened(ev)}}
                                                    handleEdit={(ev)=>{setEdit(ev)}}
                                        />
                                    </div>
                                :
                                    <div className='weekend__wrapper'>
                                        <h1 className='weekend'>На сьогодні, запланованих занять - немає.</h1>
                                        <Link to='/homework' className='btn colored'>Переглянути д/з</Link>
                                    </div>
                            }
                        </>
                    }
                </div>
            :
                <Navigate to={'/login'}/>
            }
        </>
    );
}
