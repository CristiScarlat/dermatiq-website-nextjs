import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Form from '../components/Form';
import Spinner from "../components/Spinner";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import styles from "../styles/Booking.module.css";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [loading, setLoading] = useState(false);

  const timeInterval = 15;

  const getEvents = () => {
    const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const currentMonth = selectedDate.getMonth();
    const formatedCurrentMonth = currentMonth + 1 > 9 ? currentMonth + 1 : `0${currentMonth + 1}`;
    const maxDate = new Date(`${selectedDate.getFullYear()}-${formatedCurrentMonth}-${lastDayOfMonth}T00:00:00Z`);
    const minDate = new Date(selectedDate);
    if (minDate.getMonth() !== new Date().getMonth()) {
      minDate.setDate(1);
    }
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_CALENDAR_EVENTS_URL}&timeMin=${minDate.toISOString()}&timeMax=${maxDate.toISOString()}`)
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
          setEvents(formatData);
          const arr = formatData.filter(event => event.start.substring(0, 10) === selectedDate.toISOString().substring(0, 10));
          getDisabledTimes(arr);
        }
        else console.log(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
  }

  useEffect(() => {
    getEvents();
  }, [selectedDate])

  const generateTimeButtons = (step, minHour, minMinutes, maxHour, maxMinutes) => {
    const dt = new Date(1970, 0, 1);
    const rc = [];
    while (dt.getDate() === 1) {
      if (dt.getHours() >= minHour && dt.getHours() <= maxHour) {
        const hh = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
        const mm = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
        rc.push(hh + ":" + mm);
      }
      dt.setMinutes(dt.getMinutes() + step);
    }
    return rc;
  }

  const getDisabledTimes = (arrEvents) => {
    setDisabledTimes([]);
    arrEvents.forEach(e => {
      let final = null;
      const timesArr = [];
      const dt = new Date(e.start);
      do {
        const hh = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
        const mm = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
        final = hh + ":" + mm;
        timesArr.push(final);
        dt.setMinutes(dt.getMinutes() + timeInterval)
      } while (dt.getHours() !== new Date(e.end).getHours());
      setDisabledTimes(timesArr);
    })
  }

  const handleSelectedDay = (date) => {
    setSelectedDay(date);
    const arr = events.filter(event => event.start.substring(0, 10) === new Date(date).toISOString().substring(0, 10));
    setSelectedEvents(arr);
    getDisabledTimes(arr);
  }

  const handleTimeButtonClick = (time) => {
    setSelectedTime(time);
  }

  return (
    <main>
      <div className="d-flex flex-column align-items-center">
        <div className='section-title'>Programare</div>
        <hr className='sections-separator' />
      </div>

      <div className="row ms-4 me-4">
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 col-md">
          <DatePicker
            selected={selectedDay}
            onChange={handleSelectedDay}
            onMonthChange={(m) => setSelectedDate(m)}
            inline
            minDate={new Date()}
            highlightDates={[
              {
                "react-datepicker__day--highlighted-custom": events.map(e => new Date(e.start))
              }
            ]}
          />

          <div className="d-flex flex-wrap justify-content-start m-5" style={{ minWidth: '20rem' }}>
            {generateTimeButtons(30, 9, 30, 23, 0).map(t => {
              return (
                <button key={t}
                  type="button"
                  className={`btn ${disabledTimes.includes(t) ? 'btn-secondary' : 'btn-primary'} m-2`}
                  disabled={disabledTimes.includes(t)}
                  onClick={() => handleTimeButtonClick(t)}
                  style={selectedTime === t ? {
                    backgroundColor: 'green',
                    border: 'none',
                    color: 'black',
                    fontSize: '18px'
                  } : {}}>
                  {t}
                </button>
              )
            })}
          </div>
        </div>
        <div className="col-md" style={{ opacity: selectedTime ? 1 : 0.4 }}>
          <Form className="ms-5 me-5 mb-5" submitButtonDisabled={!selectedTime} />
        </div>
      </div>
      {loading && <Spinner />}
    </main>
  )
};
