export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day);

  if (filteredDay === undefined || filteredDay.length === 0) {
    return filteredDay;
  };

  const arrayOfDays = filteredDay.map(element => {
    return element.appointments;
  });


  const appts = [];
  arrayOfDays[0].forEach(element => {
    for (const appt in state.appointments) {
      if (state.appointments[appt]['id'] === element) {
        appts.push(state.appointments[appt])
      };
    };
  });

  return appts;
};

export function getInterview(state, interview) {
  let interviewInfo;

  if (interview === null ) {
    return null;
  };
  
  for (const interviewer in state.interviewers) {
    if (interview['interviewer'] === state.interviewers[interviewer]['id']) {
      interviewInfo = {...interview, interviewer: state.interviewers[interviewer]}
      return interviewInfo;
    };
  };

};

// --- Given the state and day, displays the available interviewers  --- // 
export function getInterviewersByDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day);

  if (filteredDay === undefined || filteredDay.length === 0) {
    return filteredDay;
  };

  const arrayOfInterviwers = filteredDay.map(element => {
    return element.interviewers;
  });

  const interviewers = [];

  arrayOfInterviwers[0].forEach(element => {
    for (const appt in state.interviewers) {
      if (state.interviewers[appt]['id'] === element) {
        interviewers.push(state.interviewers[appt]);
      };
    };
  });

  return interviewers;
};