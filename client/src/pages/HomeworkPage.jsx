import '../stylesheets/HomeworkPage.css'; 

import URL from '../URL';
import {useState, useEffect} from 'react';

export default function HomeworkPage () {

    const [homework, setHomework] = useState([]);

    useEffect(() => {
        fetch(URL + '/homework',  {credentials: 'include'})
        .then(response => {
            response.json().then(homework => {
              setHomework(homework);
            });
        });
    }, []); 

    function Task ({subject, homework}) {
        return (
            <div className="task__wrapper">
                <div className="task__info">
                    <div className="subject">{subject} :</div>
                    <div className="task">{homework}</div>
                </div>
                <button className='btn colored'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <div className="homework__page">
            <h1 className="section__h1">Домашне завдання</h1>
            <div className="homework">
                {homework.length > 0 && homework.map(task => <Task key={task._id} {...task}/>)}
            </div>
        </div>
    );
}