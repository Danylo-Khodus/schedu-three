import {format} from 'date-fns';
import { useEffect, useState } from "react";

export default function Schedule ({group, date, lessonOne, lessonTwo, lessonThree, lessonFour, lessonFive, lessonSix}) {

    const lessons = [
        {
            lesson: lessonOne,
            nextLesson: lessonTwo.subject,
            beginTime: `${date}T06:00:00.388Z`,
            endTime: `${date}T06:40:00.388Z`,
        },
        {
            lesson: lessonTwo,
            nextLesson: lessonThree.subject,
            beginTime: `${date}T06:50:00.388Z`,
            endTime: `${date}T07:30:00.388Z`,
        },
        {
            lesson: lessonThree,
            nextLesson: lessonFour.subject,
            beginTime: `${date}T07:40:00.388Z`,
            endTime: `${date}T08:20:00.388Z`,
        },
        {
            lesson: lessonFour,
            nextLesson: lessonFive.subject,
            beginTime: `${date}T08:30:00.388Z`,
            endTime: `${date}T09:10:00.388Z`,
        },
        {
            lesson: lessonFive,
            nextLesson: lessonSix.subject,
            beginTime: `${date}T09:20:00.388Z`,
            endTime: `${date}T10:00:00.388Z`,
        },
        {
            lesson: lessonSix,
            nextLesson: '',
            beginTime: `${date}T10:10:00.388Z`,
            endTime: `${date}T10:50:00.388Z`,
        },
    ];

    function Lesson ({group, lesson, nextLesson, beginTime, endTime}) {

        // LESSON VARIABLES

        const [opened, setOpened] = useState(false);

        // HOMEWORK ASSIGNMENT  

        const [data, setData] = useState({
            group,
            subject: lesson.subject,
            homework: lesson.homework,
        });

        function postHomework() {
            if (lesson.homework !== '') {
                fetch('http://localhost:4000/homework', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type':'application/json'}
                });
            };
        };

        // STATUS CHANGE

        const [status, setStatus] = useState('');

        useEffect(()=>{
            const currentTime = new Date().getTime();
            const soonTime = new Date(beginTime).getTime() - 10*60*1000;

            if (currentTime >= soonTime && !(currentTime >= new Date(beginTime).getTime())) {
                setStatus('soon');
            } else if (currentTime >= new Date(beginTime).getTime() && !(currentTime >= new Date(endTime).getTime()))  {
                setStatus('ongoing');
            }  else if (currentTime >= new Date(endTime).getTime()) {
                setStatus('finished');
            }
        },[]);

        setInterval(()=>{
            const currentTime = format(new Date(), 'dd.MM.yyyy HH:mm:ss');
            const soonTime = format(new Date(beginTime).getTime() - 10*60*1000, 'dd.MM.yyyy HH:mm:ss');

            if (currentTime === soonTime) {
                window.location.reload();
            } else if (currentTime === format(new Date(beginTime), 'dd.MM.yyyy HH:mm:ss'))  {
                window.location.reload();
            } else if (currentTime === format(new Date(endTime), 'dd.MM.yyyy HH:mm:ss')) {
                postHomework();
                setTimeout(()=>{
                    window.location.reload();
                },100);
            }

        },1000);

        function openLink (link) {
            if (link && link != '') {
                window.open(link, '_blank');
            }
        };

        return (
            <>
                {lesson.subject ? 
                    <div className="lesson__wrapper">
                        <div className={`status__dot ${status} ${!nextLesson? 'last': ''}`}></div>
                        <div className={`lesson ${opened? 'opened':''}`}>
                            <div className="lesson__preview" onClick={() => setOpened(prev => !prev)}>
                                <div className="name">{lesson.subject}</div>
                                <div className="time">
                                    <div className="start">{format(new Date(beginTime), 'H:mm')}</div>
                                    <div className="end">{format(new Date(endTime), 'H:mm')}</div>
                                </div>
                            </div>
                            {opened? 
                            <>
                                <div className="lesson__inner">
                                    <button className='btn colored doc__btn'
                                            onClick={() => openLink(lesson.presentation)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                        Презентація
                                    </button>
                                    <button className={`btn colored ${status === 'soon' || status === 'ongoing'? '':'inactive'}`}
                                            onClick={() => openLink(lesson.link)}>Перейти</button>
                                </div>
                            </>:<></>
                            }
                        </div>
                    </div> : <></>
                }
            </>
        )
    }

    return (
        <div className="lessons">
            {lessons.length > 0 && lessons.map((lesson) => 
            <Lesson key={lesson.beginTime} 
                    group={group} 
                    {...lesson}/>)}
        </div>
    );
}