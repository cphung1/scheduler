import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
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
  return { state, setDay, bookInterview, cancelInterview};

}
