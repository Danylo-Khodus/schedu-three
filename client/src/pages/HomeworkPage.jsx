import '../stylesheets/HomeworkPage.css'; 

import URL from '../URL';
import { Link, Navigate} from "react-router-dom";
import { UserContext } from '../UserContext';
import {useState, useEffect, useContext} from 'react';

export default function HomeworkPage () {

    // CHECKING IF THE USER IS LOGGED IN

    const {userInfo} = useContext(UserContext);

    // GETTING LIST OF HOME ASSIGNMENTS

    const [homework, setHomework] = useState([]);

    useEffect(() => {
        fetch(URL + '/api/homework').then(response => {
            response.json().then(list => {
              setHomework(list);
            });
        });
    }, []); 

    const filtered = homework.filter((ev) => {
        const fullName = `${userInfo?.lastName} ${userInfo?.firstName}`;

        if (userInfo?.perm === 'teacher') {
            if (ev.teacher.includes(fullName) && (ev.status === 'sent' || ev.status === 'checked')) {return ev}
        } else {
            if (ev.student_id.includes(userInfo?.id)) {return ev}
        }
    });

    // TASK COMPONENT

    function Task ({_id, status, group, student_fullName, subject, homework, link}) {

        const [newLink, setNewLink] = useState(link);

        const [currentStatus, setCurrentStatus] = useState(status);

        const [opened, setOpened] = useState(false);

        async function handleClick (stat) {

            const response = await fetch(URL + '/api/homework', {
                method: 'PUT',
                body: JSON.stringify({ _id, stat, newLink }),
                headers: {'Content-Type':'application/json'},
            });
            if (response.status !== 200) {
                alert('При відправленні доманього завдання сталася помилка. Будь-ласка, спробуйте пізніше.');
            } else {
                setCurrentStatus(stat);
            }
            
        };

        async function handleDeletion () {

            const response = await fetch(URL + '/api/homework', {
                method: 'DELETE',
                body: JSON.stringify({ _id }),
                headers: {'Content-Type':'application/json'},
            });
            if (response.status !== 200) {
                alert('Видалення не вдалося. Будь-ласка, спробуйте пізніше.');
            } else {
                window.location.reload();
            }

        };

        return (
            <>
                {userInfo?.perm !== 'teacher' ?
                    <div className='task__wrapper'>
                        <div className="task__info__wrapper" onClick={()=>{setOpened(prev=>!prev)}}>
                            {currentStatus === 'assigned' &&
                                <div className='btn colored no-hover'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                    </svg>
                                </div>
                            }
                            {currentStatus === 'sent' && 
                                <div className='btn sent inactive' style={{backgroundColor: 'var(--clr-yellow)'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            }
                            {currentStatus === 'checked' && 
                                <div className='btn checked inactive'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                            }
                            <div className={`task__info ${(currentStatus === 'checked' || currentStatus === 'sent') ? 'hidden':''}`} style={{gap: `${opened ? 'var(--size-xxs)' : '0'}`}}>
                                <div className="subject">{subject} :</div>
                                <div className={`task ${opened ? 'full' : ''}`}>{homework}</div>
                            </div>
                        </div>
                        <div className={`task__input__wrapper ${opened ? 'shown':''}`}>
                            <div className="task__input">
                                <input className={`${currentStatus !== 'assigned' ? 'inactive' : ''}`}
                                    type='text' 
                                    value={newLink}
                                    placeholder={'Посилання на домашню роботу*'}
                                    onChange={(ev)=> setNewLink(ev.target.value)}
                                />
                                {(currentStatus === 'assigned' || currentStatus === 'sent') ?
                                <button className={`btn colored ${(newLink === '' || currentStatus === 'sent') ? 'inactive' : ''}`} onClick={()=>{handleClick('sent')}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </button>
                                :
                                <button className='btn delete' onClick={()=>{handleDeletion()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                                }
                            </div>
                            {newLink !== '' && 
                                <img src={newLink} alt="Image" border="0" onClick={()=>{window.open(newLink, '_blank');}}/>
                            }
                        </div>
                    </div>
                    :
                    <div className='task__wrapper'>
                        <div className="task__info__wrapper" onClick={()=>{setOpened(prev=>!prev)}}>
                            {currentStatus === 'sent' && 
                                <div className='btn sent no-hover' style={{backgroundColor: 'var(--clr-red)'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            }
                            {currentStatus === 'checked' && 
                                <div className='btn checked inactive'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                            }
                            <div className={`task__info ${currentStatus === 'checked' ? 'hidden':''}`} style={{gap: `${opened ? 'var(--size-xxs)' : '0'}`}}>
                                <div className="student__info">
                                    <p>{group}</p>
                                    <p>{student_fullName}</p>
                                </div>
                                <div className="subject teacher">{subject}</div>
                                <div className={`task ${opened ? 'full' : 'hidden'}`}>{homework}</div>
                            </div>
                        </div>
                        <div className={`task__input__wrapper ${opened ? 'shown':''}`}>
                            <div className="task__input" >
                                <input className={`${currentStatus !== 'checked' ? '' : 'inactive'}`}
                                    type='text' 
                                    value={newLink}
                                    placeholder={'Посилання на домашню роботу*'}
                                    onChange={(ev)=> setNewLink(ev.target.value)}
                                />
                                {currentStatus === 'sent' ?
                                <button className={`btn colored ${(newLink === '' || currentStatus === 'checked') ? 'inactive' : ''}`} onClick={()=>{handleClick('checked')}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </button>
                                :
                                <button className='btn delete' onClick={()=>{handleDeletion()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                                }
                            </div>
                            {newLink !== '' && 
                                <img src={newLink} alt="Image" border="0" onClick={()=>{window.open(newLink, '_blank');}}/>
                            }
                        </div>
                    </div>
                }
            </>
        );
    };

    return (
        <div className="homework__page">
            <h1 className="section__h1">Домашне завдання</h1>
            <div className="homework">
                {filtered.length > 0 
                ? 
                filtered.map(task => <Task key={task._id} {...task}/>)
                :
                <div className='weekend__wrapper'>
                    <h1 className='weekend'>Все домашне завдання на данний момент виконано. Так тримати!</h1>
                    <Link to='/homework' className='btn colored'>Повернутися до розкладу</Link>
                </div>
                }
            </div>
        </div>
    );
}
