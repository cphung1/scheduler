import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

// --- single interviewer, and how it should behave/look once clicked and/or not clicked --- // 
export default function InterviewerListItem(props) {
  const interviewClass = classnames("interviewers__item", {
    'interviewers__item--selected' : props.selected,
  });

  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img className='interviewers__item-image' src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
};