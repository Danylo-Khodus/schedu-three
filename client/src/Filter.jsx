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
    };
  
    const dates = [
      {
        preview: translatedDate(first),
        date: format(new Date(first), 'yyyy-MM-dd'),
      },
      {
        preview: translatedDate(second),
        date: format(new Date(second), 'yyyy-MM-dd'),
      },
      {
        preview: translatedDate(third),
        date: format(new Date(third), 'yyyy-MM-dd'),
      },
      {
        preview: translatedDate(fourth),
        date: format(new Date(fourth), 'yyyy-MM-dd'),
      },
      {
        preview: translatedDate(fifth),
        date: format(new Date(fifth), 'yyyy-MM-dd'),
      },
    ];

    return (
        <>  
            <div className="days__wrapper">
                {dates.map((item)=>
                    <div className={`day__filter ${selected === item.date ? 'chosen' : ''}`} onClick={()=> handleCallback(item.date)}>{item.preview}</div>          
                )}
            </div>
        </>
    )
}