import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

// --- Shows single day, and how it show behave if clicked, as well as text for remining spots --- // 
export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    'day-list__item--selected' : props.selected,
    'day-list__item--full ' : props.spots === 0
  });

  const formatSpots = function(spots){ 
    if (spots === 0) {
      return `no spots remaining`
    }
    if (spots === 1) {
      return `${spots} spot remaining`
    }
    if (spots >  1) {
      return `${spots} spots remaining`
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}  data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};