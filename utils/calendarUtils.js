
export const filterEventsByDate = (events, filterDate) => {
    console.log("filter-events-by-selected-date")
    return events.filter(event => event.start.substring(0, 10) === new Date(filterDate).toISOString('ro-RO', { timeZone: 'UTC' }).substring(0, 10));
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
    if(currentTime.getDate() === selectedDay.getDate() && currentTime.getMonth() === selectedDay.getMonth() && currentTime.getFullYear() === selectedDay.getFullYear()){
      const selectedHour = t.split(":")[0];
      const selectedMinutes = t.split(":")[1];
      if(Number(selectedHour) < currentTime.getHours())return true;
      else if(Number(selectedHour) == currentTime.getHours() && Number(selectedMinutes) <= currentTime.getMinutes())return true
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
              end: item.end.dateTime
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