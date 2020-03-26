import { useState } from "react";

// --- Function that determines what component to be rendered -- // 
// --- Keeps track of the copmonent rendered through the history state --- // 
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if(!replace) {
      setHistory(prev => [...prev, mode]);
    };
    setMode(newMode);
  };

  
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 1]);
      setHistory(prev => [...prev.slice(0, -1)]);
    };
  };

  return { mode, transition, back };

};
