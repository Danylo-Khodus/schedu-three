import '../stylesheets/HomeworkPage.css'; 

import URL from '../URL';
import { Link} from "react-router-dom";
import { UserContext } from '../UserContext';
import {useState, useEffect, useContext} from 'react';

export default function HomeworkPage () {

    // GETTING LIST OF HOME ASSIGNMENTS

    const {userInfo} = useContext(UserContext);

    const [homeworkList, setHomeworkList] = useState([]);

    useEffect(() => {
        fetch('https://schedu-three.vercel.app/api' + '/homework',  {credentials: 'include'})
        .then(response => {
            response.json().then(homework => {
              setHomeworkList(homework);
            });
        });
    }, []); 

    const filteredHomeworkList = homeworkList.filter((ev) => {
        if (ev.group.includes(userInfo?.group)) {return ev}
    });

    // TASK COMPONENT

    function Task ({_id, status, user, group, subject, homework}) {

        async function handleStatusChange (stat) {

            const response = await fetch('https://schedu-three.vercel.app/api' + '/homework', {
                method: 'PUT',
                body: JSON.stringify({ _id, stat, user, group, subject, homework}),
                headers: {'Content-Type':'application/json'},
            });
            if (response.status === 200) {
                window.location.reload();
            } else {
                alert('При відправленні доманього завдання сталася помилка. Будь-ласка, спробуйте пізніше.');
            }
            
        };

        return (
            <>
            {status === 'assigned' &&
                <div className="task__wrapper">
                    <div className="task__info">
                        <div className="subject">{subject} :</div>
                        <div className="task">{homework}</div>
                    </div>
                    <button className='btn colored' onClick={() => handleStatusChange('sent')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            }
            {status === 'sent' && 
                <div className='task__wrapper'>
                    <div className="task__info done">
                        <div className="subject">{subject} :</div>
                        <div className="task">{homework}</div>
                    </div>
                    <button className='btn done inactive'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </button>
                </div>
            }
            </>
        );
    };

    return (
        <div className="homework__page">
            <h1 className="section__h1">Домашне завдання</h1>
            <div className="homework">
                {filteredHomeworkList.length > 0 
                ? 
                filteredHomeworkList.map(task => <Task key={task._id} {...task}/>)
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
