import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import styles from "../styles/Booking.module.css";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const today = new Date();
  const maxTime = new Date().setHours(0, 0, 0, 0);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentMonth = today.getMonth();
  const formatedCurrentMonth = currentMonth > 9 ? currentMonth + 1 : `0${currentMonth + 1}`;
  const maxDate = new Date(`${today.getFullYear()}-${formatedCurrentMonth}-${lastDayOfMonth}T00:00:00Z`)
  const timeInterval = 15;

  useEffect(() => {
    console.log(`${process.env.NEXT_PUBLIC_CALENDAR_EVENTS_URL}&timeMin=${today.toISOString()}&timeMax=${maxDate.toISOString()}`)
    //setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_CALENDAR_EVENTS_URL}&timeMin=${today.toISOString()}&timeMax=${maxDate.toISOString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const formatData = [];
          data.items.forEach(item => {
            if (item.start) {
              formatData.push({
                start: item.start.dateTime,
                end: item.end.dateTime
              })
            }
          })
          setEvents(formatData)
        }

        //setLoading(false)
      })
  }, [])

  const generateTableColumns = (step, minHour, minMinutes, maxHour, maxMinutes) => {
    const dt = new Date(1970, 0, 1);
    const rc = [];
    while (dt.getDate() === 1) {
      if (dt.getHours() >= minHour && dt.getHours() <= maxHour) {
        const hh = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`
        const mm = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`
        rc.push(hh + ":" + mm);
      }
      dt.setMinutes(dt.getMinutes() + step);
    }
    return rc;
  }

  const handleSelectedDate = (date) => {
    setSelectedDate(date)
    const arr = events.filter(event => event.start.substring(0, 10) === new Date(date).toISOString().substring(0, 10));
    setSelectedEvents(arr);
    setDisabledTimes([])
    arr.forEach(e => {
      let final = null
      const timesArr = []
      const dt = new Date(e.start)
      do {
        const hh = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`
        const mm = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`
        final = hh + ":" + mm;
        timesArr.push(final)
        dt.setMinutes(dt.getMinutes() + timeInterval)
      } while (dt.getHours() !== new Date(e.end).getHours());

      setDisabledTimes(timesArr);

    })
  }

  return (
    <main>
      <div className="d-flex flex-column align-items-center">
        <div className='section-title'>Programare</div>
        <hr className='sections-separator' />
      </div>

      <div className="w-100 d-flex flex-column align-items-center gap-4">
        <h4>Selecteaza unul din intervalele disponibile:</h4>
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-5">
          <DatePicker
            selected={selectedDate}
            onChange={handleSelectedDate}
            inline
            minDate={today}
          />

          <div className="d-flex flex-wrap justify-content-start" style={{ width: '20%', minWidth: '20rem' }}>
            {generateTableColumns(30, 9, 30, 23, 0).map(t => {
              return (
                <button key={t}
                  type="button"
                  className={`btn ${disabledTimes.includes(t) ? 'btn-secondary' : 'btn-primary'} m-2`}
                  disabled={disabledTimes.includes(t)}>
                  {t}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
};
