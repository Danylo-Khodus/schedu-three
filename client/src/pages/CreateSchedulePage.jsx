import '../stylesheets/CreateSchedulePage.css';

import URL from '../URL';
import React, { useEffect } from 'react';
import { useState, useContext } from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from '../UserContext';

export default function CreateArticlePage() {

    const {userInfo} = useContext(UserContext);

    // CHECKING PERMISSION

    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
         if (userInfo?.perm !== 'admin') {
             setRedirect(true);
         }
     },[]);

    // INPUTS CONSTRUCTIONS

    const [schedule, setSchedule] = useState({
        group: '',
        date: '',
        lessonOne:{
            teacher: '',
            subject: '',
            theme: '',
            presentation: '',
            additional: '',
            link: '',
            homework: '',
        }, 
        lessonTwo:{
            teacher: '',
            subject: '',
            theme: '',
            presentation: '',
            additional: '',
            link: '',
            homework: '',
        },
        lessonThree:{
            teacher: '',
            subject: '',
            theme: '',
            presentation: '',
            additional: '',
            link: '',
            homework: '',
        },
        lessonFour:{
            teacher: '',
            subject: '',
            theme: '',
            presentation: '',
            additional: '',
            link: '',
            homework: '',
        },
        lessonFive:{
            teacher: '',
            subject: '',
            theme: '',
            presentation: '',
            additional: '',
            link: '',
            homework: '',
        },
        lessonSix:{
            teacher: '',
            subject: '',
            theme: '',
            presentation: '',
            additional: '',
            link: '',
            homework: '',
        },
    });

    const group__options = [
        {label: "Оберіть групу*...",value: "initial",},
        {label: "3-В",value: "3-В",},
        {label: "3-Г",value: "3-Г",},
    ];

    // const [lessonOne, setLessonOne] = useState({
    //     teacher: '',
    //     subject: '',
    //     theme: '',
    //     presentation: '',
    //     additional: '',
    //     link: '',
    //     homework: '',
    // });
    // const [lessonTwo, setLessonTwo] = useState({
    //     teacher: '',
    //     subject: '',
    //     theme: '',
    //     presentation: '',
    //     additional: '',
    //     link: '',
    //     homework: '',
    // });
    // const [lessonThree, setLessonThree] = useState({
    //     teacher: '',
    //     subject: '',
    //     theme: '',
    //     presentation: '',
    //     additional: '',
    //     link: '',
    //     homework: '',
    // });
    // const [lessonFour, setLessonFour] = useState({
    //     teacher: '',
    //     subject: '',
    //     theme: '',
    //     presentation: '',
    //     additional: '',
    //     link: '',
    //     homework: '',
    // });
    // const [lessonFive, setLessonFive] = useState({
    //     teacher: '',
    //     subject: '',
    //     theme: '',
    //     presentation: '',
    //     additional: '',
    //     link: '',
    //     homework: '',
    // });
    // const [lessonSix, setLessonSix] = useState({
    //     teacher: '',
    //     subject: '',
    //     theme: '',
    //     presentation: '',
    //     additional: '',
    //     link: '',
    //     homework: '',
    // });

    // CREATING SCHEDULE

    const lesson__options = [
        {label: "Оберіть заняття*...",value: "initial",},
        {label: "Українська мова",value: "Українська мова",},
        {label: "Літературне читання",value: "Літературне читання",},
        {label: "Англійська мова",value: "Англійська мова",},
        {label: "Математика",value: "Математика",},
        {label: "Я пізнаю світ",value: "Я пізнаю світ",},
        {label: "Мистецтво",value: "Мистецтво",},
        {label: "Фізична культура",value: "Фізична культура",},
        {label: "Інформатика",value: "Інформатика",},
    ];

    // CREATING NEW LESSONS

    function createNewLesson(ev) {
        if (schedule.group !== '' && schedule.date !== '') {
            ev.preventDefault();
            const response = fetch('https://schedu-three.vercel.app' + '/api/create-schedule', {
            method: 'POST',
            body: JSON.stringify(schedule),
            headers: {'Content-Type':'application/json'},
            });
     
            if (response) {
            setRedirect(true);
            }
        } else {
            alert('Дата та клас мають бути вказані.');
        }
    }

    // REDIRECTING

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <>
        {!userInfo?.id ?
            <Navigate to={'/login'}/>
            :
            <form className="new__schedule" onSubmit={createNewLesson}>
                <h1 className='section__h1'>Новий розклад</h1>
                <div className="generalInputs__wrapper">  
                    <input type='date' 
                           name='date'
                           placeholder={'Дата*'}
                           onChange={(ev)=> setSchedule({
                                ...schedule,
                                [ev.target.name]:ev.target.value,
                            })}/>
                    <select name='group'
                            onChange={(ev) => setSchedule({
                                ...schedule, 
                                [ev.target.name]:ev.target.value})}>
                            {group__options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                    </select>
                </div>
                <div className='lessonInputs__wrapper'>
                    <div className="lessonInput__wrapper">

                        <h1 className='lessonInput__title'>9:00 - 9:40</h1>

                        <select name='subject' 
                                onChange={(ev)=> setSchedule({
                                    ...schedule,
                                    lessonOne: {
                                        ...lessonOne,
                                        [ev.target.name]:ev.target.value,
                                }})}>
                                {lesson__options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                        </select>
                        <input name='teacher'
                            type="text" 
                            placeholder={'Викладач*'}
                            onChange={(ev)=> setSchedule({
                                ...schedule,
                                lessonOne: {
                                    ...lessonOne,
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='theme'
                            type="text" 
                            placeholder={'Тема заняття*'}
                            onChange={(ev)=> setSchedule({
                                ...schedule,
                                lessonOne: {
                                    ...lessonOne,
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='link'
                            type="text" 
                            placeholder={'Посилання на заняття*'}
                            onChange={(ev)=> setSchedule({
                                ...schedule,
                                lessonOne: {
                                    ...lessonOne,
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='presentation'
                            type="text" 
                            placeholder={'Посилання на презентацію'}
                            onChange={(ev)=> setSchedule({
                                ...schedule,
                                lessonOne: {
                                    ...lessonOne,
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='additional'
                            type="text" 
                            placeholder={'Додаткові матеріали'}
                            onChange={(ev)=> setSchedule({
                                ...schedule,
                                lessonOne: {
                                    ...lessonOne,
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='homework'
                            type="text" 
                            placeholder={'Домашне завдання*'}
                            onChange={(ev)=> setSchedule({
                                ...schedule,
                                lessonOne: {
                                    ...lessonOne,
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                    </div>
                    <div className="lessonInput__wrapper">

                        <h1 className='lessonInput__title'>9:50 - 10:30</h1>

                        <select name='subject' 
                                onChange={(ev) => setSchedule({
                                    ...schedule,
                                    setLessonTwo:{
                                        ...lessonTwo, 
                                        [ev.target.name]:ev.target.value,
                                }})}>
                                {lesson__options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                        </select>
                        <input name='teacher'
                            type="text" 
                            placeholder={'Викладач*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonTwo:{
                                    ...lessonTwo, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='theme'
                            type="text" 
                            placeholder={'Тема заняття*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonTwo:{
                                    ...lessonTwo, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='link'
                            type="text" 
                            placeholder={'Посилання на заняття*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonTwo:{
                                    ...lessonTwo, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='presentation'
                            type="text" 
                            placeholder={'Посилання на презентацію'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonTwo:{
                                    ...lessonTwo, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='additional'
                            type="text" 
                            placeholder={'Додаткові матеріали'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonTwo:{
                                    ...lessonTwo, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='homework'
                            type="text" 
                            placeholder={'Домашне завдання*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonTwo:{
                                    ...lessonTwo, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                    </div>
                    <div className="lessonInput__wrapper">

                        <h1 className='lessonInput__title'>10:40 - 11:20</h1>

                        <select name='subject' 
                                onChange={(ev) => setSchedule({
                                    ...schedule,
                                    setLessonThree:{
                                        ...lessonThree, 
                                        [ev.target.name]:ev.target.value,
                                }})}>
                                {lesson__options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                        </select>
                        <input name='teacher'
                            type="text" 
                            placeholder={'Викладач*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonThree:{
                                    ...lessonThree, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='theme'
                            type="text" 
                            placeholder={'Тема заняття*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonThree:{
                                    ...lessonThree, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='link'
                            type="text" 
                            placeholder={'Посилання на заняття*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonThree:{
                                    ...lessonThree, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='presentation'
                            type="text" 
                            placeholder={'Посилання на презентацію'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonThree:{
                                    ...lessonThree, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='additional'
                            type="text" 
                            placeholder={'Додаткові матеріали'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonThree:{
                                    ...lessonThree, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='homework'
                            type="text" 
                            placeholder={'Домашне завдання*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonThree:{
                                    ...lessonThree, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                    </div>
                    <div className="lessonInput__wrapper">

                        <h1 className='lessonInput__title'>11:30 - 12:10</h1>

                        <select name='subject' 
                                onChange={(ev) => setSchedule({
                                    ...schedule,
                                    setLessonFour:{
                                        ...lessonFour, 
                                        [ev.target.name]:ev.target.value,
                                }})}>
                                {lesson__options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                        </select>
                        <input name='teacher'
                            type="text" 
                            placeholder={'Викладач*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFour:{
                                    ...lessonFour, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='theme'
                            type="text" 
                            placeholder={'Тема заняття*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFour:{
                                    ...lessonFour, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='link'
                            type="text" 
                            placeholder={'Посилання на заняття*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFour:{
                                    ...lessonFour, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='presentation'
                            type="text" 
                            placeholder={'Посилання на презентацію'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFour:{
                                    ...lessonFour, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='additional'
                            type="text" 
                            placeholder={'Додаткові матеріали'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFour:{
                                    ...lessonFour, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='homework'
                            type="text" 
                            placeholder={'Домашне завдання*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFour:{
                                    ...lessonFour, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                    </div>
                    <div className="lessonInput__wrapper">

                        <h1 className='lessonInput__title'>12:20 - 13:00</h1>

                        <select name='subject' 
                                onChange={(ev) => setSchedule({
                                    ...schedule,
                                    setLessonFive:{
                                        ...lessonFive, 
                                        [ev.target.name]:ev.target.value,
                                }})}>
                                {lesson__options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                        </select>
                        <input name='teacher'
                            type="text" 
                            placeholder={'Викладач*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFive:{
                                    ...lessonFive, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='theme'
                            type="text" 
                            placeholder={'Тема заняття*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFive:{
                                    ...lessonFive, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='link'
                            type="text" 
                            placeholder={'Посилання на заняття*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFive:{
                                    ...lessonFive, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='presentation'
                            type="text" 
                            placeholder={'Посилання на презентацію'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFive:{
                                    ...lessonFive, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='additional'
                            type="text" 
                            placeholder={'Додаткові матеріали'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFive:{
                                    ...lessonFive, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='homework'
                            type="text" 
                            placeholder={'Домашне завдання*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonFive:{
                                    ...lessonFive, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                    </div>
                    <div className="lessonInput__wrapper">

                        <h1 className='lessonInput__title'>13:10 - 13:50</h1>

                        <select name='subject' 
                                onChange={(ev) => setSchedule({
                                    ...schedule,
                                    setLessonSix:{
                                        ...lessonSix, 
                                        [ev.target.name]:ev.target.value,
                                }})}>
                                {lesson__options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                        </select>
                        <input name='teacher'
                            type="text" 
                            placeholder={'Викладач*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonSix:{
                                    ...lessonSix, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='theme'
                            type="text" 
                            placeholder={'Тема заняття*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonSix:{
                                    ...lessonSix, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='link'
                            type="text" 
                            placeholder={'Посилання на заняття*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonSix:{
                                    ...lessonSix, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='presentation'
                            type="text" 
                            placeholder={'Посилання на презентацію'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonSix:{
                                    ...lessonSix, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='additional'
                            type="text" 
                            placeholder={'Додаткові матеріали'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonSix:{
                                    ...lessonSix, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                        <input name='homework'
                            type="text" 
                            placeholder={'Домашне завдання*'}
                            onChange={(ev) => setSchedule({
                                ...schedule,
                                setLessonSix:{
                                    ...lessonSix, 
                                    [ev.target.name]:ev.target.value,
                            }})}/>
                    </div>
                </div>

                <button className="btn create-btn">Зберегти</button>
            </form>
        }
        </>
    );
}
