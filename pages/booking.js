import { useState, useEffect, useRef, useContext } from "react";
import DatePicker from "react-datepicker";
import Form from "../components/Form";
import Spinner from "../components/Spinner";
import ModalComponent from "../components/Modal";
import CustomCard from "../components/CustomCard";
import { teamCards } from "../utils/uiConstants";
import {
  getEvents,
  addEvent,
  filterEventsByDate,
  filterEventsByDr,
  getEventsBusyTimes,
  processEvents,
  isPastTime,
} from "../utils/calendarUtils";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdPhoneInTalk } from "react-icons/md";
import { Button } from "react-bootstrap";

import { Ctx } from '../context/context';

import styles from "../styles/Booking.module.css";
import homeStyles from "../styles/Home.module.css";

import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const currentInitDate = new Date();

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(currentInitDate);
  const [selectedDay, setSelectedDay] = useState(currentInitDate);
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({});
  const [step, setStep] = useState(0);
  const [selectedDr, setSelectedDr] = useState();
  const [freeDaysPerDr, setFreeDaysPerDr] = useState([]);

  const addEventData = useRef({});
  const dayWasSelected = useRef(false);

  const { state, dispatch } = useContext(Ctx);

  const lang = state.lang

  useEffect(() => {
    if (step === 1) {
      setLoading(true);
      getEvents(selectedDate).then((res) => {
        const eventsBySelectedDr = filterEventsByDr(res, selectedDr.title);
        const { bookedHoursPerDay, freeDays } = processEvents(eventsBySelectedDr);
        setEvents(bookedHoursPerDay);
        setFreeDaysPerDr(freeDays);
        const arr = bookedHoursPerDay?.filter(
          (event) =>
            event.start.substring(0, 10) ===
            selectedDate.toISOString().substring(0, 10)
        );
        getDisabledTimes(arr);
        setLoading(false);
      });
    }
  }, [selectedDate, step]);

  useEffect(() => {
    if (step === 0) {
      setSelectedDate(currentInitDate);
      setSelectedDay(currentInitDate);
      setSelectedTime(undefined);
      dayWasSelected.current = false;
    }
  }, [step]);

  const generateTimeButtons = (
    step,
    minHour,
    minMinutes,
    maxHour,
    maxMinutes,
    qty
  ) => {
    const now = new Date();
    const dt = new Date(1970, 0, 1);
    const rc = [];
    while (dt.getDate() === 1) {
      if (
        dt.getHours() >= minHour &&
        dt.getMinutes() >= minMinutes &&
        dt.getHours() < maxHour
      ) {
        const hh =
          dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
        const mm =
          dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
          if(selectedDay.getDate() === now.getDate()){
            if(dt.getHours() >= now.getHours() && dt.getMinutes() > now.getMinutes()){
              rc.push(hh + ":" + mm);
            }
          }
          else rc.push(hh + ":" + mm);
      }
      dt.setMinutes(dt.getMinutes() + step);
      //if(rc.length === qty) break;
    }
    return rc;
  };

  const generateTimeButtonByBusyTime = (step, minHour, minMinutes, maxHour, maxMinutes) => {
    let busyTimes = [];
    busyTimes = generateTimeButtons(step, minHour, minMinutes, maxHour, maxMinutes, 3);
    return busyTimes;
  }

  const getDisabledTimes = (arrEvents) => {
    setDisabledTimes([]);
    const busyTimesArr = getEventsBusyTimes(arrEvents, selectedDr.timeInterval);
    setDisabledTimes(busyTimesArr);
  };

  const handleSelectedDay = (date) => {
    if (!dayWasSelected.current) dayWasSelected.current = true;
    setSelectedDay(date);
    if (selectedDate.getMonth() !== date.getMonth()) {
      setSelectedDate(date);
    }
    const arr = filterEventsByDate(events, date);
    setSelectedEvents(arr);
    getDisabledTimes(arr);
    setSelectedTime(null);
  };

  const handleTimeButtonClick = (time) => {
    if (!dayWasSelected.current) {
      dispatch({
        type: "SET_TOAST",
        toast: {
          showToast: true,
          type: "danger",
          headerText: "Error.",
          bodyText: `Please confirm the date in calendar first.`,
        },
      });
      return;
    }
    setSelectedTime(time);
    const date = selectedDay.toISOString("ro-RO", { timeZone: "UTC" });
    const minDate = date.split("T")[0] + "T" + time + ":00";
    const maxDate = new Date(minDate.split("T")[0] + "T" + time + ":00Z");
    maxDate.setMinutes(maxDate.getMinutes() + selectedDr.timeInterval);

    addEventData.current = {
      end: {
        dateTime: maxDate
          .toISOString("ro-RO", { timeZone: "UTC" })
          .split(".")[0],
        timeZone: "Europe/Bucharest",
      },
      start: {
        dateTime: minDate,
        timeZone: "Europe/Bucharest",
      },
    };
    setStep(2);
  };

  const formValidation = (formFields) => {
    if (
      (formFields[0].value && formFields[0].value !== "") ||
      (formFields[1].value && formFields[1].value !== "") ||
      (formFields[2].value && formFields[2].value !== "")
    )
      return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formValidation(e.target)) {
      //calendar-event-title: nume-pacient/tel-pacient/serviciu/nume-familie-dr/online
      const selectedDrSurname = selectedDr?.title?.split(" ").pop();
      addEventData.current.description = e.target[2].value;
      addEventData.current.summary =
        e.target[0].value +
        "-" +
        e.target[1].value +
        "/" +
        e.target[3].value +
        "/" +
        e.target[4].value +
        "/" +
        "dr " + selectedDrSurname +
        "/online";
      addEventData.current.colorId = selectedDr?.colorId;
      setShowModal({
        open: true,
        title: "Please check the data once again and place your booking.",
        body: (
          <>
            <p>{`Date: ${new Date(
              addEventData.current.start.dateTime
            ).toLocaleString()}`}</p>
            <p>{`FullName: ${e.target[0].value + " " + e.target[1].value}`}</p>
            <p>{`Email: ${e.target[2].value}`}</p>
            <p>{`Telefon: ${e.target[3].value}`}</p>
            <p>{`Serviciu: ${e.target[4].value}`}</p>
          </>
        ),
      });
    } else alert("Please fill all the fields.");
  };

  const handleConfirmation = () => {
    setShowModal({ open: false });
    setLoading(true);
    addEvent(addEventData.current)
      .then((data) => {
        dispatch({
          type: "SET_TOAST",
          toast: {
            showToast: true,
            type: "success",
            headerText: "Saved.",
            bodyText: `Your appointment in ${new Date(
              addEventData.current.start.dateTime
            ).toLocaleString()} is successfully saved.`,
          },
        });
        setSelectedTime(undefined);
        setStep(0);
        setTimeout(() => {
          const temp = [...disabledTimes];
          temp.push(selectedTime);
          setDisabledTimes(temp);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleCustomCardButtonOnClick = (selectedCard) => {
    setSelectedDr(selectedCard);
    setStep(1);
  };

  const handleStepBack = () => {
    setStep((step) => step - 1);
  };

  const isFiltered = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    let booleanToReturn = false
    selectedDr.workDays.forEach(wh => {
      booleanToReturn |= (day === wh)
    })
    return booleanToReturn;
  };

  const getAvailableHours = () => {
    const arr = generateTimeButtonByBusyTime(selectedDr.timeInterval, selectedDr.workingHourStart, 0, selectedDr.workingHourEnd, 20);
    //filter out buzy hours
    let foundFreeHour = false;
    const filtered = [];
    arr.forEach((t) => {
      if (!disabledTimes.includes(t) && !foundFreeHour) foundFreeHour = true;
      if (foundFreeHour && filtered.length <= 2) {
        filtered.push(t);
      }
    });
    return filtered;
  };

  /*
  calendar-event-title: nume-pacient/tel-pacient/serviciu/nume-familie-dr/online --> calendar color
  servicii-dropdown: consult/control/dermatoscopie
   */

  return (
    <main className="p-5">
      <div className="d-flex flex-column align-items-center">
        <div className="section-title">Programare</div>
        <p className="section-title m-0"><MdPhoneInTalk className="me-1" /> +40 748 015 255</p>
        <hr className="sections-separator" />
      </div>
      {step > 0 && (
        <div className={styles["booking-breadcrumps"]}>
          <Button
            className="d-flex align-items-center custom-button"
            onClick={handleStepBack}
          >
            <IoMdArrowRoundBack className="me-1" />
            Go back
          </Button>
          <div>
            {`${selectedDr?.title ? selectedDr.title : ""} > ${dayWasSelected.current && selectedDay
                ? selectedDay.toISOString().split("T")[0]
                : ""
              } > ${selectedTime ? selectedTime : ""}`}
          </div>
        </div>
      )}
      {step === 0 && (
        <div className="booking-team-cards-container" style={{ maxWidth: '60rem', margin: 'auto' }}>
          {teamCards[state.lang].filter(teamMember => teamMember.type === 'medic').map((teamMember, index) => {
              return (
                <CustomCard
                  key={teamMember.img + "-" + index}
                  cardTitle={teamMember.title}
                  imgSrc={teamMember.img}
                  showButton={teamMember?.workDays ? true : false}
                  buttonLable={lang === 'ro' ? "Fă-ți o programare" : "Make an appointment"}
                  cardButtonOnCLick={() =>
                    handleCustomCardButtonOnClick(teamMember)
                  }
                  className={`m-3 ${homeStyles["home-custom-card"]}`}
                  maxWidth="15rem"
                  minHeight="20rem"
                >
                  <p className="card-text">{teamMember.body}</p>
                </CustomCard>
              );
          })}
        </div>
      )}

      <div className="row ms-4 me-4">
        {step === 1 && (
          <div className="d-flex justify-content-center align-items-start flex-wrap gap-2 col-md">
            <div className="d-flex flex-column flex-wrap justify-content-center m-5">
              <label>Select date:</label>
              <DatePicker
                selected={selectedDay}
                filterDate={isFiltered}
                onChange={handleSelectedDay}
                onMonthChange={(m) => {
                  dayWasSelected.current = false;
                  setSelectedDate(m);
                }}
                inline
                minDate={new Date()}
                excludeDates={freeDaysPerDr.map((fd) => new Date(fd))}
                highlightDates={[
                  {
                    "react-datepicker__day--highlighted-custom": events?.map(
                      (e) => e.start && new Date(e.start)
                    ),
                  },
                ]}
              />
            </div>

            <div
              className="d-flex flex-column flex-wrap justify-content-center align-items-start m-5"
              style={{ minWidth: "20rem" }}
            >
              <label>Select time:</label>
              <div>
                {getAvailableHours().length > 0 ? getAvailableHours().map((t) => {
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={disabledTimes.includes(t)}
                      className={`btn btn-circle ${!disabledTimes.includes(t) ? "custom-button" : ""
                        } m-2`}
                      onClick={() => handleTimeButtonClick(t)}
                      style={
                        selectedTime === t
                          ? {
                            backgroundColor: "green",
                            border: "none",
                            color: "black",
                            fontSize: "18px",
                          }
                          : {}
                      }
                    >
                      {t}
                    </button>
                  );
                }) : <p style={{color: '#f55f', fontWeight: 'bold'}}>{`Medicul nu este disponibil, va rugăm alegeți o altă zi.`}</p>}
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div
            className="col-md mt-5"
            style={{ opacity: selectedTime ? 1 : 0.4 }}
          >
            <Form handleSubmit={handleFormSubmit} />
          </div>
        )}
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
  );
};

export default Booking;
