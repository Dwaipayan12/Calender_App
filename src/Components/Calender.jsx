import  { useEffect, useState } from "react";
import "./Calender.css";
import From from "./From";
// shift+Alt+F
export default function Calender() {
  const [date, setDate] = useState(new Date());
  const [selectedDate,setSelectedDate]=useState(null);
  const [showEventForm,setShowEventForm]=useState(false);
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : {};
  });
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);
  
  const getPreviousMonth=()=>{
    const PrevMonth=new Date(date.getFullYear(),date.getMonth()-1,1);
    setDate(PrevMonth); 
  }
  const getNextMonth=()=>{
  const nextMonth=new Date(date.getFullYear(),date.getMonth()+1,1);
  setDate(nextMonth);
  }
  const CountDaysInMonth=(date)=>{
  const startofMonth=new Date(date.getFullYear(),date.getMonth(),1);
  const endofMonth=new Date(date.getFullYear(),date.getMonth()+1,0);
  const days=[];
  for (let i = 1; i < startofMonth.getDay(); i++) {
    days.push(null);
  } 
  for(let i=1;i<=endofMonth.getDate();i++)
        {
         days.push(i);
        }  
        while(days.length %7!=0)
        {
            days.push(null);
        }
        const weeks=[];
        for(let i=0;i<days.length;i+=7)
        {
            weeks.push(days.slice(i,i+7));
        }
        return weeks;
}
  const DaysInMonth=CountDaysInMonth(date);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date().getDate();
    const handleOnClick = (selectedDay) => {
      if (!selectedDay) return; 
      const selectedDateObj = new Date(date.getFullYear(), date.getMonth(), selectedDay);
      setSelectedDate(selectedDateObj.toDateString());
      setShowEventForm(true);
      
    };
  return (
    <div className="monthdiv">
      <div className="CalenderDiv">
    <div className="Firstrow">
      <button onClick={getPreviousMonth}>Privious</button>
      <div><b>{date.toDateString()}</b></div>
      <button onClick={getNextMonth}>Next</button>
    </div>
    <br></br>
    <div className="secondrow">
    <div className="weekdays">
     {weekdays.map((day,index)=>(
        <span key={index}>
            {day}
        </span>
     ))}
    </div>
    {DaysInMonth.map((week, index) => (
  <div key={index} className="week">
    {week.map((day, i) => {
      const isWeekend = i === 0 || i === 6;  

      return (
        <button
          key={i}
          className={`daybutton ${day === today ? "today" : ""} 
          ${isWeekend ? "weekend" : ""}`} 
          onClick={() => handleOnClick(day)}
        >
          {day ? day : ""}
        </button>
      );
    })}
  </div>
))}

    </div>
    </div>
    <div className="FromDiv">
      {
        selectedDate && showEventForm && 
        <From 
        selectedDate={selectedDate}
        events={events}
        setShowEventForm={setShowEventForm}
        setEvents={setEvents}
        />
      }
    </div>
    </div>
  );
}
