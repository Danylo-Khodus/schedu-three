import '../stylesheets/CreateSchedulePage.css';

import URL from '../URL';
import React from 'react';
import { useState } from "react";
import {Navigate} from "react-router-dom";

export default function CreateArticlePage() {

    const [schedule, setSchedule] = useState({
        group: '',
        data: '',
        lessonOne: {
            subject: '',
            presentation: '',
            link: '',
            homework: '',
        },
        lessonTwo: {
            subject: '',
            presentation: '',
            link: '',
            homework: '',
        },
        lessonThree: {
            subject: '',
            presentation: '',
            link: '',
            homework: '',
        },
        lessonFour: {
            subject: '',
            presentation: '',
            link: '',
            homework: '',
        },
        lessonFive: {
            subject: '',
            presentation: '',
            link: '',
            homework: '',
        },
        lessonSix: {
            subject: '',
            presentation: '',
            link: '',
            homework: '',
        },
    });

    const group__options = [
       {label: "Обрати групу*...",value: "initial",},
       {label: "3-В",value: "3-В",},
       {label: "3-Г",value: "3-Г",},
   ];

    // LESSONS VARIABLES

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

    // SCHEDULE CREATE

   const [redirect, setRedirect] = useState(false);

    function createNewSchedule(ev) {
       ev.preventDefault();
       const response = fetch('https://schedu-three.vercel.app/api' + '/create-schedule', {
       method: 'POST',
       body: JSON.stringify(schedule),
       headers: {'Content-Type':'application/json'}
       });

       if (response) {
       setRedirect(true);
       }
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    const requirements = (schedule.group !== '' && schedule.date !== '');

    return (
        <form className="new__schedule" onSubmit={createNewSchedule}>
            <h1 className='section__h1'>Новий розклад</h1>

            <div className="generalInputs__wrapper">
                <div style={{display: "grid", gap: "5px",}}>
                    <select name='group'
                            onChange={(ev)=> setSchedule({
                                ...schedule,
                                [ev.target.name]:ev.target.value,
                            })}>
                        {group__options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <input name='date'
                        type="date" 
                        placeholder={'Дата'}
                        onChange={(ev)=> setSchedule({
                            ...schedule,
                            [ev.target.name]:ev.target.value,
                        })}/>
                </div>
                <div className='blank'></div>
                <div className='blank'></div>
            </div>

            <div className='lessonInputs__wrapper'>
                <div className='lessonInput__wrapper'>
                    <h2 className='lessonInput__title'>9:00 - 9:40</h2>
                    <div className='lessonInput__info'>
                        <select name='subject' 
                                onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonOne:{...schedule.lessonOne, [ev.target.name]:ev.target.value},
                                })}>
                                {lesson__options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                        </select>
                        <input name='presentation'
                               type="text" 
                               placeholder={'Посилання на презентацію*'}
                               onChange={(ev) => 
                                   setSchedule({
                                   ...schedule, lessonOne:{...schedule.lessonOne, [ev.target.name]:ev.target.value},
                               })}
                        />       
                        <input name='link'
                               type="text" 
                               placeholder={'Посилання на заняття*'}
                               onChange={(ev) => 
                                   setSchedule({
                                   ...schedule, lessonOne:{...schedule.lessonOne, [ev.target.name]:ev.target.value},
                               })}
                        />
                        <input name='homework'
                               type="text" 
                               placeholder={'Домашне завдання*'}
                               onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonOne:{...schedule.lessonOne, [ev.target.name]:ev.target.value},
                               })}
                        />
                    </div>
                </div>
                <div className='lessonInput__wrapper'>
                    <h2 className='lessonInput__title'>9:50 - 10:30</h2>
                    <div className='lessonInput__info'>
                        <select name='subject' 
                                onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonTwo:{...schedule.lessonTwo, [ev.target.name]:ev.target.value},
                                })}>
                            {lesson__options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <input name='presentation'
                            type="text" 
                            placeholder={'Посилання на презентацію*'}
                            onChange={(ev) => 
                                setSchedule({
                                ...schedule, lessonTwo:{...schedule.lessonTwo, [ev.target.name]:ev.target.value},
                            })}
                        />
                        <input name='link'
                            type="text" 
                            placeholder={'Посилання на заняття*'}
                            onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonTwo:{...schedule.lessonTwo, [ev.target.name]:ev.target.value},
                                })}
                        />
                        <input name='homework'
                            type="text" 
                            placeholder={'Домашне завдання*'}
                            onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonTwo:{...schedule.lessonTwo, [ev.target.name]:ev.target.value},
                                })}
                        />
                    </div>
                </div>
                <div className='lessonInput__wrapper'>
                    <h2 className='lessonInput__title'>10:40 - 11:20</h2>
                    <div className='lessonInput__info'>
                        <select name='subject' 
                                onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonThree:{...schedule.lessonThree, [ev.target.name]:ev.target.value},
                                })}>
                            {lesson__options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <input name='presentation'
                            type="text" 
                            placeholder={'Посилання на презентацію*'}
                            onChange={(ev) => 
                                setSchedule({
                                ...schedule, lessonThree:{...schedule.lessonThree, [ev.target.name]:ev.target.value},
                            })}
                        />
                        <input name='link'
                            type="text" 
                            placeholder={'Посилання на заняття*'}
                            onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonThree:{...schedule.lessonThree, [ev.target.name]:ev.target.value},
                                })}
                        />
                        <input name='homework'
                            type="text" 
                            placeholder={'Домашне завдання*'}
                            onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonThree:{...schedule.lessonThree, [ev.target.name]:ev.target.value},
                                })}
                        />
                    </div>
                </div>
                <div className='lessonInput__wrapper'>
                    <h2 className='lessonInput__title'>11:30 - 12:10</h2>
                    <div className='lessonInput__info'>
                        <select name='subject' 
                                onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonFour:{...schedule.lessonFour, [ev.target.name]:ev.target.value},
                                })}>
                            {lesson__options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <input name='presentation'
                            type="text" 
                            placeholder={'Посилання на презентацію*'}
                            onChange={(ev) => 
                                setSchedule({
                                ...schedule, lessonFour:{...schedule.lessonFour, [ev.target.name]:ev.target.value},
                            })}
                        />
                        <input name='link'
                            type="text" 
                            placeholder={'Посилання на заняття*'}
                            onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonFour:{...schedule.lessonFour, [ev.target.name]:ev.target.value},
                                })}
                        />
                        <input name='homework'
                            type="text" 
                            placeholder={'Домашне завдання*'}
                            onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonFour:{...schedule.lessonFour, [ev.target.name]:ev.target.value},
                                })}
                        />
                    </div>
                </div>
                <div className='lessonInput__wrapper'>
                    <h2 className='lessonInput__title'>12:20 - 13:00</h2>
                    <div className='lessonInput__info'>
                        <select name='subject' 
                                onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonFive:{...schedule.lessonFive, [ev.target.name]:ev.target.value},
                                })}>
                                {lesson__options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                        </select>
                        <input name='presentation'
                               type="text" 
                               placeholder={'Посилання на презентацію*'}
                               onChange={(ev) => 
                                   setSchedule({
                                   ...schedule, lessonFive:{...schedule.lessonFive, [ev.target.name]:ev.target.value},
                               })}
                        />
                        <input name='link'
                               type="text" 
                               placeholder={'Посилання на заняття*'}
                               onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonFive:{...schedule.lessonFive, [ev.target.name]:ev.target.value},
                                })}
                        />
                        <input name='homework'
                               type="text" 
                               placeholder={'Домашне завдання*'}
                               onChange={(ev) => 
                                       setSchedule({
                                       ...schedule, lessonFive:{...schedule.lessonFive, [ev.target.name]:ev.target.value},
                                })}
                        />
                    </div>
                </div>
                <div className='lessonInput__wrapper'>
                    <h2 className='lessonInput__title'>13:00 - 13:40</h2>
                    <div className='lessonInput__info'>
                        <select name='subject' 
                                onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonSix:{...schedule.lessonSix, [ev.target.name]:ev.target.value},
                                })}>
                                {lesson__options.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                        </select>
                        <input name='presentation'
                               type="text" 
                               placeholder={'Посилання на презентацію*'}
                               onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonSix:{...schedule.lessonSix, [ev.target.name]:ev.target.value},
                               })}
                        />
                        <input name='link'
                               type="text" 
                               placeholder={'Посилання на заняття*'}
                               onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonSix:{...schedule.lessonSix, [ev.target.name]:ev.target.value},
                               })}
                        />
                        <input name='homework'
                               type="text" 
                               placeholder={'Домашне завдання*'}
                               onChange={(ev) => 
                                    setSchedule({
                                    ...schedule, lessonSix:{...schedule.lessonSix, [ev.target.name]:ev.target.value},
                               })}
                        />
                    </div>
                </div>
            </div>

            { requirements ? 
                <button className="btn create-btn">Зберегти</button> :
                <div className="btn create-btn unavailable">Зберегти</div>  
            }  
        </form>
    );
}