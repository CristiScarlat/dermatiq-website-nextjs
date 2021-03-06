export const processEvents = (events) => {
  const freeDays = []
  events.forEach(e => {
    if (e.summary.split("/")[0] === 'indisponibil' && e.startDate && e.endDate) {
      const formatedStartDate = new Date(e.startDate);
      const formatedEndDate = new Date(e.endDate);
      formatedStartDate.setDate(formatedStartDate.getDate() + 1);
      if (formatedStartDate.getDate() === formatedEndDate.getDate()) freeDays.push(e.startDate);
    }
  });

  //busyEvents are days when dr is working and has appointments 
  const bookedHoursPerDay = events.filter(e => {
    const startDate = new Date(e.start).getDate();
    const endDate = new Date(e.end).getDate();
    return startDate === endDate;
  });
  //disabledEvents are days when dr is not working - not available
  const freeDaysIntervals = events.filter(e => {
    if (e.start && e.end) {
      const startDate = new Date(e.start).getDate();
      const endDate = new Date(e.end).getDate();
      return e.summary.split("/")[0] === 'indisponibil' && startDate !== endDate;
    }
  });

  freeDaysIntervals.forEach(e => {
    let startDate = e.start.split("T")[0];
    freeDays.push(startDate);
    let endDate = null;
    let tempStart = null;
    do {
      endDate = e.end.split("T")[0];
      tempStart = new Date(startDate);// new object
      tempStart.setDate(tempStart.getDate() + 1);
      startDate = tempStart.toISOString().split("T")[0];
      freeDays.push(startDate);
    } while (tempStart.toISOString().split("T")[0] !== endDate);
  });

  return { bookedHoursPerDay, freeDays }
}

export const filterEventsByDate = (events, filterDate) => {
  return events.filter(event => event.start.substring(0, 10) === new Date(filterDate).toISOString('ro-RO', { timeZone: 'UTC' }).substring(0, 10));
}

export const filterEventsByDr = (events, selectedDr) => {
  return events.filter(event => {
    const drName = event.summary.split("/")[3] ? event.summary.split("/")[3] : event.summary.split("/")[1];
    console.log(event, drName, selectedDr, selectedDr.includes(drName) || selectedDr === drName)
    return selectedDr.toLowerCase().includes(drName?.toLowerCase());
  })
}

export const getEventsBusyTimes = (events, timeInterval) => {
  const timesArr = [];
  events.forEach(e => {
    let final = null;
    const dt = new Date(e.start);
    do {
      const hh = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
      const mm = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
      final = hh + ":" + mm;
      timesArr.push(final);
      dt.setMinutes(dt.getMinutes() + timeInterval);
    } while (dt.getHours() !== new Date(e.end).getHours());
  })
  return timesArr;
}

export const isPastTime = (t, selectedDay) => {
  const currentTime = new Date();
  if (currentTime.getDate() === selectedDay.getDate() && currentTime.getMonth() === selectedDay.getMonth() && currentTime.getFullYear() === selectedDay.getFullYear()) {
    const selectedHour = t.split(":")[0];
    const selectedMinutes = t.split(":")[1];
    if (Number(selectedHour) < currentTime.getHours()) return true;
    else if (Number(selectedHour) == currentTime.getHours() && Number(selectedMinutes) <= currentTime.getMinutes()) return true
  }
  return false
}

export const getEvents = async (selectedDate) => {
  const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const currentMonth = selectedDate.getMonth();
  const formatedCurrentMonth = currentMonth + 1 > 9 ? currentMonth + 1 : `0${currentMonth + 1}`;
  const maxDate = new Date(`${selectedDate.getFullYear()}-${formatedCurrentMonth}-${lastDayOfMonth}T00:00:00Z`);
  const minDate = new Date(selectedDate);
  if (minDate.getMonth() !== new Date().getMonth()) {
    minDate.setDate(1);
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CALENDAR_EVENTS_URL}&q=listEvents&timeMin=${minDate.toISOString()}&timeMax=${maxDate.toISOString()}`)
    const data = await res.json();
    if (data.items) {
      const formatData = [];
      data.items.forEach(item => {
        if (item.start) {
          formatData.push({
            start: item.start.dateTime,
            end: item.end.dateTime,
            startDate: item.start.date,
            endDate: item.end.date,
            summary: item.summary
          })
        }
      })
      return formatData;
    }
    else console.log(data);
  }
  catch (error) {
    console.log(error);
  }
}

export const addEvent = async (eventData) => {
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