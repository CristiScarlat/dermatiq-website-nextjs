import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import Form from '../components/Form';
import Spinner from "../components/Spinner";
import ModalComponent from "../components/Modal";
import CustomCard from '../components/CustomCard';
import { teamCards } from "../utils/uiConstants";
import { getEvents, filterEventsByDate, getEventsBusyTimes, isPastTime } from "../utils/calendarUtils";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "react-bootstrap";
import styles from "../styles/Booking.module.css";

import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({});
  const [step, setStep] = useState(0);
  const [selectedDr, setSelectedDr] = useState();

  const addEventData = useRef({});

  const timeInterval = 20;

  const addEvent = async (eventData) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CALENDAR_EVENTS_URL}&q=addEvent`, requestOptions)
      const data = await res.json()
      return data;
    }
    catch (error) {
      console.log(error)
      return error
    }
  }

  useEffect(() => {
    if (step === 1){
      setLoading(true)
      getEvents(selectedDate).then((res) => {
        setEvents(res);
        const arr = res.filter(event => event.start.substring(0, 10) === selectedDate.toISOString().substring(0, 10));
        getDisabledTimes(arr);
        setLoading(false)
      })
    }
  }, [selectedDate, step])

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
    const busyTimesArr = getEventsBusyTimes(arrEvents, timeInterval);
    console.log(busyTimesArr)
    setDisabledTimes(busyTimesArr);
  }

  const handleSelectedDay = (date) => {
    setSelectedDay(date);
    const arr = filterEventsByDate(events, date);
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
    setStep(2);
  }

  const formValidation = (formFields) => {
    if ((formFields[0].value && formFields[0].value !== '') || (formFields[1].value && formFields[1].value !== '') || (formFields[2].value && formFields[2].value !== '')) return true;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (formValidation(e.target)) {
      //calendar-event-title: nume-pacient/tel-pacient/serviciu/nume-familie-dr/online
      const selectedDrSurname = selectedDr.title.split(" ").pop();
      addEventData.current.description = e.target[2].value;
      addEventData.current.summary = e.target[0].value + "-" + e.target[1].value + "/" + e.target[3].value + "/" + e.target[4].value + "/" + selectedDrSurname + "/online";
      addEventData.current.colorId = selectedDr.colorId;
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
    setShowModal({ open: false })
    setLoading(true)
    addEvent(addEventData.current)
      .then(data => {
        setTimeout(() => {
          const temp = [...disabledTimes]
          temp.push(selectedTime)
          setDisabledTimes(temp)
          setLoading(false)
        }, 1000)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  const handleCustomCardButtonOnClick = (selectedCard) => {
    setSelectedDr(selectedCard);
    console.log({ events })
    setStep(1);
  }

  const handleStepBack = () => {
    setStep(step => step - 1);
  }

  /*
  calendar-event-title: nume-pacient/tel-pacient/serviciu/nume-familie-dr/online --> calendar color
  servicii-dropdown: consult/control/dermatoscopie
   */


  return (
    <main className="ps-5 pe-5">
      <div className="d-flex flex-column align-items-center">
        <div className='section-title'>Programare</div>
        <hr className='sections-separator' />
      </div>
      {step > 0 && <div className={styles['booking-breadcrumps']}>
        <Button
          className="d-flex align-items-center custom-button"
          onClick={handleStepBack}>
          <IoMdArrowRoundBack className="me-1" />
          Go back
        </Button>
        <div>
          {`${selectedDr?.title ? selectedDr.title : ""} > ${selectedDay ? selectedDay.toISOString().split('T')[0] : ""} > ${selectedTime ? selectedTime : ""}`}</div>
      </div>
      }
      {step === 0 && <div className="booking-team-cards-container">
        {teamCards.map((teamMember, index) => {
          if (index < 4) {
            return (
              <CustomCard
                key={teamMember.img + '-' + index}
                cardTitle={teamMember.title}
                imgSrc={teamMember.img}
                buttonLable="Fa-ti o programare"
                cardButtonOnCLick={() => handleCustomCardButtonOnClick(teamMember)}
                className="mb-4 booking-team-custom-card"
              >
                <p className="card-text">
                  {teamMember.body}
                </p>
              </CustomCard >
            )
          }
        })}
      </div>}

      <div className="row ms-4 me-4">
        {step === 1 && <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 col-md">
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
                  className={`btn ${(disabledTimes.includes(t) || isPastTime(t, selectedDay)) ? 'btn-secondary custom-button' : 'custom-button'} m-2`}
                  disabled={disabledTimes.includes(t) || isPastTime(t, selectedDay)}
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
        </div>}
        {step === 2 && <div className="col-md mt-5" style={{ opacity: selectedTime ? 1 : 0.4 }}>
          <Form className="ms-5 me-5 mb-5" submitButtonDisabled={!selectedTime} handleSubmit={handleFormSubmit} />
        </div>}
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

export default Booking;