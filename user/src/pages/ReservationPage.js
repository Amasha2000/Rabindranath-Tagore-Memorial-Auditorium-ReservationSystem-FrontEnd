import React, { useState } from 'react';
import AvailabilityCalendar from '../components/Calendar/AvailabilityCalendar';
import ApplicationForm from '../components/Form/SubmissionForm';

const ReservationPage = () => {
  const [calendarSelectedDate, setCalendarSelectedDate] = useState(null);

  return (
    <div>
      <h1>Reserve the Auditorium</h1>
      <AvailabilityCalendar setCalendarSelectedDate={setCalendarSelectedDate} />
      <ApplicationForm calendarSelectedDate={calendarSelectedDate} />
    </div>
  );
};

export default ReservationPage;
