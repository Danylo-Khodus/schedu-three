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
            if (ev.teacher.includes(fullName) && ev.status !== 'assigned') {return ev}
        } else {
            if (ev.student_id.includes(userInfo?.id)) {return ev}
        }
    });

    // TASK COMPONENT

    function Task (task) {

        const [currentStatus, setCurrentStatus] = useState(task.status);

        async function handleStatusChange () {

            const response = await fetch(URL + '/api/homework', {
                method: 'PUT',
                body: JSON.stringify(task),
                headers: {'Content-Type':'application/json'},
            });
            if (response.status !== 200) {
                alert('При відправленні доманього завдання сталася помилка. Будь-ласка, спробуйте пізніше.');
            }
            
        };

        return (
            <div className="task__wrapper">
                <div className="task__info">
                    <div className="subject">{task.subject} :</div>
                    <div className="task">{task.homework}</div>
                </div>
                <button className={`btn ${currentStatus === 'assigned' && 'colored'} ${currentStatus === 'sent' && 'done inactive'}`} onClick={() => {setCurrentStatus('sent'); handleStatusChange();}}>
                    {currentStatus === 'sent' ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    }
                </button>
            </div>
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
