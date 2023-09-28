import '../stylesheets/HomeworkPage.css'; 

import {useState, useEffect} from 'react';

export default function HomeworkPage () {

    const [homework, setHomework] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/homework',  {credentials: 'include'})
        .then(response => {
            response.json().then(homework => {
              setHomework(homework);
            });
        });
    }, []); 

    function Task ({subject, homework}) {
        return (
            <div className="task__wrapper">
                <div className="task">
                    <div className="subject">{subject}</div>
                    {homework}
                </div>
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