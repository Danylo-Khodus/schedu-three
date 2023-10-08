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

        const [opened, setOpened] = useState(false);

        async function handleClick (stat) {

            const response = await fetch(URL + '/api/homework', {
                method: 'PUT',
                body: JSON.stringify({ _id, stat, newLink }),
                headers: {'Content-Type':'application/json'},
            });
            if (response.status !== 200) {
                alert('При відправленні доманього завдання сталася помилка. Будь-ласка, спробуйте пізніше.');
            }
            
        };

        return (
            <>
                {userInfo?.perm !== 'teacher' ?
                    <div className='task__wrapper'>
                        <div className="task__info__wrapper" onClick={()=>{setOpened(prev=>!prev)}}>
                            {status === 'assigned' &&
                                <div className='btn colored no-hover'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                    </svg>
                                </div>
                            }
                            {status === 'sent' && 
                                <div className='btn sent inactive' style={{backgroundColor: 'var(--clr-yellow)'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            }
                            {status === 'checked' && 
                                <div className='btn checked inactive'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            }
                            <div className="task__info">
                                <div className="subject">{subject} :</div>
                                <div className={`task ${opened ? 'full' : ''}`}>{homework}</div>
                            </div>
                        </div>
                        <div className={`task__input__wrapper ${opened ? 'shown':''}`}>
                            <div className="task__input">
                                <input className={`${status !== 'assigned' ? 'inactive' : ''}`}
                                    type='text' 
                                    value={newLink}
                                    placeholder={'Посилання на домашню роботу*'}
                                    onChange={(ev)=> setNewLink(ev.target.value)}
                                />
                                <button className={`btn colored ${(newLink === '' || status === 'sent') ? 'inactive' : ''}`} onClick={()=>{handleClick('sent')}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>
                                </button>
                            </div>
                            {newLink !== '' && 
                                <img src={newLink} alt="Image" border="0" onClick={()=>{window.open(newLink, '_blank');}}/>
                            }
                        </div>
                    </div>
                    :
                    <div className='task__wrapper'>
                        <div className="task__info__wrapper" onClick={()=>{setOpened(prev=>!prev)}}>
                            {status === 'sent' && 
                                <div className='btn sent no-hover' style={{backgroundColor: 'var(--clr-red)'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            }
                            {status === 'checked' && 
                                <div className='btn checked inactive'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                            }
                            <div className="task__info" style={{gap: `${opened ? 'var(--size-xxs)' : '0'}`}}>
                                <div className="student__info">{group}&#160;{student_fullName}</div>
                                <div className="subject teacher">{subject}</div>
                                <div className={`task ${opened ? 'full' : 'hidden'}`}>{homework}</div>
                            </div>
                        </div>
                        <div className={`task__input__wrapper ${opened ? 'shown':''}`}>
                            <div className="task__input" >
                                <input className={`${status !== 'checked' ? '' : 'inactive'}`}
                                    type='text' 
                                    value={newLink}
                                    placeholder={'Посилання на домашню роботу*'}
                                    onChange={(ev)=> setNewLink(ev.target.value)}
                                />
                                <button className={`btn colored ${(newLink === '' || status === 'checked') ? 'inactive' : ''}`} onClick={()=>{handleClick('checked')}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </button>
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
        <>
            {!userInfo?.id ?
                <Navigate to={'/login'}/>
                :
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
            }
        </>
    );
}
