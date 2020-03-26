import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // ------------------------- Set applications states ------------------------- // 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  // --- Gets the ID for the day given the name of the day (i.e. Monday = 1 --- // 
  let dayID;
  for (const num in state.days) {
    if (state.day === state.days[num].name) {
      dayID = num;
    };
  };

  useEffect(() => { 
    const promiseDays = axios.get('/api/days');
    const promiseAppts = axios.get('/api/appointments');
    const promiseIntervierwers = axios.get('/api/interviewers');
    
    Promise.all([promiseDays, promiseAppts, promiseIntervierwers])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  },[]);

  // ------------------------- Function to book interview ------------------------- // 
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

        if(!state.appointments[id].interview) {
          state.days[dayID].spots -= 1;
        };

        setState({...state, appointments});
      });
  };

  // ------------------------- Function to cancel interview ------------------------- // 
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
        
        state.days[dayID].spots += 1;

        setState({...state, appointments});
      });
  };

  return { state, setDay, bookInterview, cancelInterview };

};
