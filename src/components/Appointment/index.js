
import React from "react";

import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT"; 
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


// ------------------------- Compiles all appointment copmonents together and dicatates which component is to be shown based on the state ------------------------- // 
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    return interview;
  };
  

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            transition(SAVING)
            props.bookInterview(props.id, save(name, interviewer))
              .then(() => transition(SHOW))
              .catch(error => transition(ERROR_SAVE, true))
          }}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting"/>
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => transition(SHOW)}
          onConfirm={() => {
            transition(DELETING, true)
            props.cancelInterview(props.id)
              .then(() => transition(EMPTY))
              .catch(error => transition(ERROR_DELETE, true))
          }}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={(name, interviewer) => {
            transition(SAVING)
            props.bookInterview(props.id, save(name, interviewer))
              .then(() => transition(SHOW))
              .catch(error => transition(ERROR_SAVE, true))
          }}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="An error has occured while trying to delete the appointment."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="An error has occured while trying to save the appointment."
          onClose={() => back()}
        />
      )}
    </article>
  );
};