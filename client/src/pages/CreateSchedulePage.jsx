import '../stylesheets/CreateSchedulePage.css';

import React, { useEffect } from 'react';
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

    const [redirect, setRedirect] = useState(false);

    const requirements = (schedule.group !== '' && schedule.date !== '');

    const group__options = [
       {label: "Обрати групу*...",value: "initial",},
       {label: "3-В",value: "3-В",},
       {label: "3-Г",value: "3-Г",},
   ];

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

   const [clicked, setClicked] = useState(false);
   const [clicked2, setClicked2] = useState(false);
   const [clicked3, setClicked3] = useState(false);
   const [clicked4, setClicked4] = useState(false);
   const [clicked5, setClicked5] = useState(false);
   const [clicked6, setClicked6] = useState(false);

    function createNewSchedule(ev) {
       ev.preventDefault();
       const response = fetch('https://schedu-two.vercel.app/api/create-schedule', {
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

    return (
        <form className="new__schedule" onSubmit={createNewSchedule}>
            <h1 className='section__h1'>Новий розклад</h1>
            
            <select name='group'
                    onChange={(ev)=> setSchedule({
                        ...schedule,
                        [ev.target.name]:ev.target.value,
                    })}>
                {group__options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
            <input name='date'
                   type="date" 
                   placeholder={'Дата'}
                   onChange={(ev)=> setSchedule({
                    ...schedule,
                    [ev.target.name]:ev.target.value,
                })}/>

            <div className='lessonInput__wrapper'>
                <h2 className='lessonInput__title' 
                    onClick={() => setClicked(prev => !prev)}>
                        Заняття №1
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${clicked? 'rotate': ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                </h2>
                <div className={`lessonInput__info ${clicked? '': 'hidden'}`}>
                    <select name='subject' 
                            onChange={(ev) => 
                                setSchedule({
                                ...schedule, lessonOne:{...schedule.lessonOne, [ev.target.name]:ev.target.value},
                            })}>
                        {lesson__options.map((option) => (
                            <option value={option.value}>{option.label}</option>
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
                <h2 className='lessonInput__title' 
                    onClick={() => setClicked2(prev => !prev)}>
                        Заняття №2
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${clicked2? 'rotate': ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                </h2>
                <div className={`lessonInput__info ${clicked2? '': 'hidden'}`}>
                    <select name='subject' 
                            onChange={(ev) => 
                                setSchedule({
                                ...schedule, lessonTwo:{...schedule.lessonTwo, [ev.target.name]:ev.target.value},
                            })}>
                        {lesson__options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <input name='presentation'
                        type="text" 
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
                <h2 className='lessonInput__title' 
                    onClick={() => setClicked3(prev => !prev)}>
                        Заняття №3
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${clicked3? 'rotate': ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                </h2>
                <div className={`lessonInput__info ${clicked3? '': 'hidden'}`}>
                    <select name='subject' 
                            onChange={(ev) => 
                                setSchedule({
                                ...schedule, lessonThree:{...schedule.lessonThree, [ev.target.name]:ev.target.value},
                            })}>
                        {lesson__options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <input name='presentation'
                        type="text" 
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
                <h2 className='lessonInput__title' 
                    onClick={() => setClicked4(prev => !prev)}>
                        Заняття №4
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${clicked4? 'rotate': ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                </h2>
                <div className={`lessonInput__info ${clicked4? '': 'hidden'}`}>
                    <select name='subject' 
                            onChange={(ev) => 
                                setSchedule({
                                ...schedule, lessonFour:{...schedule.lessonFour, [ev.target.name]:ev.target.value},
                            })}>
                        {lesson__options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <input name='presentation'
                        type="text" 
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
                <h2 className='lessonInput__title' 
                    onClick={() => setClicked5(prev => !prev)}>
                        Заняття №5
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${clicked5? 'rotate': ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                </h2>
                <div className={`lessonInput__info ${clicked5? '': 'hidden'}`}>
                    <select name='subject' 
                            onChange={(ev) => 
                                setSchedule({
                                ...schedule, lessonFive:{...schedule.lessonFive, [ev.target.name]:ev.target.value},
                            })}>
                        {lesson__options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <input name='presentation'
                        type="text" 
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
                <h2 className='lessonInput__title' 
                    onClick={() => setClicked6(prev => !prev)}>
                        Заняття №6
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${clicked6? 'rotate': ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                </h2>
                <div className={`lessonInput__info ${clicked6? '': 'hidden'}`}>
                    <select name='subject' 
                            onChange={(ev) => 
                                setSchedule({
                                ...schedule, lessonSix:{...schedule.lessonSix, [ev.target.name]:ev.target.value},
                            })}>
                        {lesson__options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <input name='presentation'
                        type="text" 
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

            { requirements ? 
                <button className="btn create-btn">Зберегти</button> :
                <div className="btn create-btn unavailable">Зберегти</div>  
            }  
        </form>
    );
}