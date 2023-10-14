import {format} from 'date-fns';
import { useEffect, useState } from "react";

export default function Filter({handleCallback, selected}) {

    const [first, setFirst] = useState(new Date());
    const [second, setSecond] = useState(new Date(first.getTime() + (24 * 60 * 60 * 1000)));
    const [third, setThird] = useState(new Date(second.getTime() + (24 * 60 * 60 * 1000)))
    const [fourth, setFourth] = useState(new Date(third.getTime() + (24 * 60 * 60 * 1000)));
    const [fifth, setFifth] = useState(new Date(fourth.getTime() + (24 * 60 * 60 * 1000)));

    const days = [
        {
            id: 1,
            date: first,
        },
        {
            id: 2,
            date: second,
        },
        {
            id: 3,
            date: third,
        },
        {
            id: 4,
            date: fourth,
        },
        {
            id: 5,
            date: fifth,
        },
    ];

    function translatedDate (date) {
        const month = format(new Date(date), 'MMM');
        const [translatedMonth, setTranslatedMonth] = useState('');
        useEffect(()=>{
            if (month === 'Jan') {
                setTranslatedMonth('Січ');
            } else if (month === 'Feb'){
                setTranslatedMonth('Лют');
            } else if (month === 'Mar'){
                setTranslatedMonth('Бер');
            } else if (month === 'Apr'){
                setTranslatedMonth('Кві');
            } else if (month === 'May'){
                setTranslatedMonth('Трав');
            } else if (month === 'June'){
                setTranslatedMonth('Чер');
            } else if (month === 'July'){
                setTranslatedMonth('Лип');
            } else if (month === 'Aug'){
                setTranslatedMonth('Сер');
            } else if (month === 'Sep'){
                setTranslatedMonth('Вер');
            } else if (month === 'Oct'){
                setTranslatedMonth('Жов');
            } else if (month === 'Nov'){
                setTranslatedMonth('Лис');
            } else if (month === 'Dec'){
                setTranslatedMonth('Груд');
            }
        }, []);
        return `${format(new Date(date), 'dd') + ' '+ translatedMonth}`
    }

    function DayOption ({date}) {
        return (
            <div className={`day__filter ${selected === format(new Date(date), 'yyyy-MM-dd') ? 'chosen' : ''}`} onClick={()=> handleCallback(format(new Date(date), 'yyyy-MM-dd'))}>{translatedDate(date)}</div>
        );
    }

    return (
        <>  
            <div className="days__wrapper">
                {days.map(day => <DayOption key={day.id} {...day}/>)}               
            </div>
        </>
    )
}