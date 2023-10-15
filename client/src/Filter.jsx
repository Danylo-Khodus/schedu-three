import {format} from 'date-fns';
import { useEffect, useState } from "react";

export default function Filter({handleCallback, selected}) {

    const first = new Date();
    const second = new Date(first.getTime() + (24 * 60 * 60 * 1000));
    const third = new Date(second.getTime() + (24 * 60 * 60 * 1000));
    const fourth = new Date(third.getTime() + (24 * 60 * 60 * 1000));
    const fifth = new Date(fourth.getTime() + (24 * 60 * 60 * 1000));

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

    return (
        <>  
            <div className="days__wrapper">
            <div className={`day__filter ${selected === format(new Date(first), 'yyyy-MM-dd') ? 'chosen' : ''}`} onClick={()=> handleCallback(format(new Date(first), 'yyyy-MM-dd'))}>{translatedDate(first)}</div>
            <div className={`day__filter ${selected === format(new Date(second), 'yyyy-MM-dd') ? 'chosen' : ''}`} onClick={()=> handleCallback(format(new Date(second), 'yyyy-MM-dd'))}>{translatedDate(second)}</div>
            <div className={`day__filter ${selected === format(new Date(third), 'yyyy-MM-dd') ? 'chosen' : ''}`} onClick={()=> handleCallback(format(new Date(third), 'yyyy-MM-dd'))}>{translatedDate(third)}</div>
            <div className={`day__filter ${selected === format(new Date(fourth), 'yyyy-MM-dd') ? 'chosen' : ''}`} onClick={()=> handleCallback(format(new Date(fourth), 'yyyy-MM-dd'))}>{translatedDate(fourth)}</div>
            <div className={`day__filter ${selected === format(new Date(fifth), 'yyyy-MM-dd') ? 'chosen' : ''}`} onClick={()=> handleCallback(format(new Date(fifth), 'yyyy-MM-dd'))}>{translatedDate(fifth)}</div>             
            </div>
        </>
    )
}