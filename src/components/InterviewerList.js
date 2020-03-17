import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  console.log(props.interviewers)
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
    { props.interviewers.map(element => {
        return (
          <InterviewerListItem 
          key={element.id}
          name={element.name} 
          avatar={element.avatar} 
          selected={element.id === props.interviewer}
          setInterviewer= {event => props.setInterviewer(element.id)}
          />
        );
      }) }
    </ul>
  </section>
  );
}