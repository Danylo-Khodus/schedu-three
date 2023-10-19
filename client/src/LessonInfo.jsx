import URL from "./URL";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function LessonInfo ({opened, status, edit, data, handleEdit, handleOpen}) {

    const {userInfo} = useContext(UserContext);

    // GETTING LESSON INFO

    const [lesson, setLesson] = useState(data);

    useEffect(()=>{
        setLesson(data);
    },[data]);

    // UPDATING LESSON INFO

    async function updateLessonInfo () {

        const response = await fetch(URL + '/api/schedule', {
            method: 'PUT',
            body: JSON.stringify(lesson),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });

        if (response.status === 200) {
            handleEdit(false);
        } else {
            alert('Не вдалося зімінити інформацію заняття. Спробуйте пізніше.');
        }

    }

    // HOMEWORK ASSIGNMENT  

    function sendNotification() {

        const data = {
            caller_id: lesson._id,
            user_id: userInfo?.id,
            seen: false,
            message: `Було додано нове домашне завдання з <strong>${lesson.subject}</strong>`,
            link: '/homework',
        };

        fetch(URL + '/api/notifications', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type':'application/json'},
        });

    };

    function postHomework() {
        const data = {
            status: 'assigned',
            group: userInfo?.group,
            student_id: userInfo?.id,
            student: `${userInfo?.lastName} ${userInfo?.firstName}`,
            teacher_id: lesson.teacher_id,
            teacher: lesson.teacher,
            subject: lesson.subject,
            homework: lesson.homework,
        };

        if (userInfo?.perm !== 'teacher') {
            if (lesson.homework !== '') {
                fetch(URL + '/api/homework', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type':'application/json'}
                });
                sendNotification();
            };
        }
    };

    return (
        <div className={`lesson__info ${opened && 'shown'}`}>
            <div className="absolute__buttons">
                {(userInfo?.perm === 'teacher' && userInfo?.id === lesson.teacher_id) && (
                    <>
                        {!edit ?
                            <button className='btn edit' onClick={()=>{handleEdit(true)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                        :
                            <button className='btn edit' onClick={()=>{updateLessonInfo()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </button>
                        }
                    </>
                )}
                <button className='btn close' onClick={()=>{handleOpen(false)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className='image'>
                <h1>{lesson.subject}</h1>
            </div>
            <div className="info">
                {!edit ?
                    <>
                        <p><strong>Викладач:</strong><br/>{lesson.teacher}</p>
                        <p><strong>Тема:</strong><br/>{lesson.theme}</p>
                    </>
                :
                    <>
                        <p><strong>Тема:</strong></p>
                        <input type="text" 
                            name='theme'
                            value={lesson.theme}
                            onChange={ev => setLesson({...lesson,[ev.target.name]:ev.target.value})}
                        />
                        <p><strong>Презентація:</strong></p>
                        <input type="text" 
                            name='presentation'
                            value={lesson.presentation}
                            onChange={ev => setLesson({...lesson,[ev.target.name]:ev.target.value})}
                        />
                        <p><strong>Посилання на заняття:</strong></p>
                        <input type="text" 
                            name='link'
                            value={lesson.link}
                            onChange={ev => setLesson({...lesson,[ev.target.name]:ev.target.value})}
                        />
                        <p><strong>Домашне завдання:</strong></p>
                        <input type="text" 
                            name='homework'
                            value={lesson.homework}
                            onChange={ev => setLesson({...lesson,[ev.target.name]:ev.target.value})}
                        />
                    </>
                }
            </div>
            <div className="buttons">
                <button className={`btn colored ${!(lesson.presentation) && 'inactive'}`} 
                        onClick={()=>{
                            openLink(lesson.presentation); 
                        }}>
                    Презентація
                </button>
                <button className={`btn colored ${status === 'soon' || status === 'ongoing' && status !== 'finished' ? '' : 'inactive'}`} 
                        onClick={()=>{
                            window.open((lesson.link),'_blank');
                            postHomework();
                        }}>
                    Перейти
                </button>
            </div>
        </div>
    )
}