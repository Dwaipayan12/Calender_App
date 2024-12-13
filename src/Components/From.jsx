import { useState } from "react";
import "./Calender.css"
// eslint-disable-next-line react/prop-types
export default function From({ selectedDate, events, setEvents, setShowEventForm }) {
  const [eventDetails, setEventDetails] = useState({ name: "", startTime: "", endTime: "", description: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const existingEvents = events[selectedDate] || [];

  const handleSaveEvent = () => {
    const updatedEvents = JSON.parse(JSON.stringify(events)); 

    if (!updatedEvents[selectedDate]) {
      updatedEvents[selectedDate] = [];
    }

    if (editingEvent) {
      updatedEvents[selectedDate] = updatedEvents[selectedDate].map((event) =>
        event.name === editingEvent.name ? { ...event, ...eventDetails } : event
      );
      alert("Event Property Changes");
    } else {
      updatedEvents[selectedDate].push(eventDetails);
      alert("Event Saved")
    }

    setEvents(updatedEvents);
    setShowEventForm(false); 
    setEditingEvent(null); 
    setEventDetails({ name: "", startTime: "", endTime: "", description: "" });
  };

  const handleDeleteEvent = (eventName) => {
    const updatedEvents = { ...events };
    updatedEvents[selectedDate] = updatedEvents[selectedDate].filter((event) => event.name !== eventName);
    setEvents(updatedEvents);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal">
      <h2>{editingEvent ? "Edit Event" : "Add Event"}</h2>
      <p><b>{selectedDate}</b></p>
      <label>Event Name:</label>
      <br></br>
      <input
        type="text"
        name="name"
        value={eventDetails.name}
        onChange={handleInputChange}
      />
      <br></br>
      <label>Start Time:</label>
      <br></br>
      <input
        type="time"
        name="startTime"
        value={eventDetails.startTime}
        onChange={handleInputChange}
      />
      <label>End Time:</label>
      <br></br>
      <input
        type="time"
        name="endTime"
        value={eventDetails.endTime}
        onChange={handleInputChange}
      />
      <br></br>
      <label>Description:</label>
      <br></br>
      <textarea
        name="description"
        value={eventDetails.description}
        onChange={handleInputChange}
      />
      <button onClick={handleSaveEvent}>{editingEvent ? "Save Changes" : "Add Event"}</button>
      <button onClick={() => setShowEventForm(false)}>Cancel</button>

      <h3>Existing Events</h3>
      <ul>
        {existingEvents.map((event, index) => (
          <li key={index}>
            {event.name} ({event.startTime} - {event.endTime})
            <button onClick={() => {
              setEventDetails(event);
              setEditingEvent(event);
            }}>Edit</button>
            <button onClick={() => handleDeleteEvent(event.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
