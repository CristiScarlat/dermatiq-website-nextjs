import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import Form from '../components/Form';
import Spinner from "../components/Spinner";
import ModalComponent from "../components/Modal";
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
  const [showModal, setShowModal] = useState({});

  const addEventData = useRef({});

  const timeInterval = 30;

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

    fetch(`${process.env.NEXT_PUBLIC_CALENDAR_EVENTS_URL}&q=listEvents&timeMin=${minDate.toISOString()}&timeMax=${maxDate.toISOString()}`)
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

  const addEvent = async (eventData) => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'      
      },
      body: JSON.stringify(eventData)
    };
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_CALENDAR_EVENTS_URL}&q=addEvent`, requestOptions)
      const data = await res.json()
      return data;
    }
    catch(error){
      console.log(error)
      return error
    }
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
    const timesArr = [];
    arrEvents.forEach(e => {
      let final = null;
      const dt = new Date(e.start);
      do {
        const hh = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
        const mm = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
        final = hh + ":" + mm;
        timesArr.push(final);
        dt.setMinutes(dt.getMinutes() + timeInterval)
      } while (dt.getHours() !== new Date(e.end).getHours()); 
    })
    setDisabledTimes(timesArr);

    console.log(timesArr)
  }

  const handleSelectedDay = (date) => {
    setSelectedDay(date);
    const arr = events.filter(event => event.start.substring(0, 10) === new Date(date).toISOString('ro-RO', { timeZone: 'UTC' }).substring(0, 10));
    console.log(date, new Date(date).toISOString('ro-RO', { timeZone: 'UTC' }).substring(0, 10), arr)
    setSelectedEvents(arr);
    getDisabledTimes(arr);
    setSelectedTime(null);
  }

  const handleTimeButtonClick = (time) => {
    setSelectedTime(time);
    const date = selectedDay.toISOString('ro-RO', { timeZone: 'UTC' });
    const minDate = date.split('T')[0] + 'T' + time + ':00';
    const maxDate = new Date(minDate.split('T')[0] + 'T' + time + ':00Z');
    maxDate.setMinutes(maxDate.getMinutes() + timeInterval);

    addEventData.current = {
      end: {
        dateTime: maxDate.toISOString('ro-RO', { timeZone: 'UTC' }).split('.')[0],
        timeZone: "Europe/Bucharest"
      },
      start: {
        dateTime: minDate,
        timeZone: "Europe/Bucharest"
      }
    }
  }

  const formValidation = (formFields) => {
    if ((formFields[0].value && formFields[0].value !== '') || (formFields[1].value && formFields[1].value !== '') || (formFields[2].value && formFields[2].value !== '')) return true;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (formValidation(e.target)) {
      addEventData.current.description = e.target[2].value;
      addEventData.current.summary = e.target[0].value + "-" + e.target[1].value;
      setShowModal({
        open: true,
        title: "Please check the data once again and place your booking.",
        body: <><p>{`Date: ${new Date(addEventData.current.start.dateTime).toLocaleString()}`}</p>
          <p>{`FullName: ${e.target[0].value + " " + e.target[1].value}`}</p></>
      })
    }
    else alert('Please fill all the fields.')
  }

  const handleConfirmation = () => {
    setLoading(true)
    addEvent(addEventData.current)
    .then(data => {
      setTimeout(() => {
        getEvents();
      }, 1000)
    })
    .catch(error => {
      setLoading(false)
      console.log(error)
    })
  }

  const isPastTime = (t) => {

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
            {generateTimeButtons(timeInterval, 9, 30, 23, 0).map(t => {
              return (
                <button key={t}
                  type="button"
                  className={`btn ${disabledTimes.includes(t) ? 'btn-secondary' : 'btn-primary'} m-2`}
                  disabled={disabledTimes.includes(t) || isPastTime(t)}
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
            }).filter((t, i, arr) => i !== arr.length - 1)}
          </div>
        </div>
        <div className="col-md" style={{ opacity: selectedTime ? 1 : 0.4 }}>
          <Form className="ms-5 me-5 mb-5" submitButtonDisabled={!selectedTime} handleSubmit={handleFormSubmit} />
        </div>
      </div>
      {loading && <Spinner />}

      <ModalComponent
        show={showModal?.open}
        title={showModal?.title}
        body={showModal?.body}
        onCancel={() => setShowModal({ open: false })}
        onConfirm={handleConfirmation}
      />
    </main>
  )
};
