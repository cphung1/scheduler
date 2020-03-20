import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const promiseDays = axios.get('http://localhost:8001/api/days');
    const promiseAppts = axios.get('http://localhost:8001/api/appointments');
    const promiseIntervierwers = axios.get('http://localhost:8001/api/interviewers');
    Promise.all([promiseDays, promiseAppts, promiseIntervierwers])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  },[]);

  const interviewers = getInterviewersByDay(state, state.day)
  const appointments = getAppointmentsForDay(state, state.day)

  function bookInterview(id, interview) {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        
        setState({...state, appointments})
      })
  };

  function cancelInterview(id, interview) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        
        setState({...state, appointments})
      })
  }
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment 
              key={appointment.id} 
              {...appointment} 
              interview={interview} 
              interviewers={interviewers} 
              bookInterview={bookInterview}
              cancelInterviw={cancelInterview}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
