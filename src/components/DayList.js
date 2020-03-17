import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  return (
    props.days.map(element => {
      return (
        <ul key={element.id}>
          <DayListItem 
          name={element.name} 
          spots={element.spots} 
          selected={element.name === props.day}
          setDay={props.setDay}  />
        </ul>
        );
      })
  );
}


