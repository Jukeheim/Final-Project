import { useState, useEffect } from 'react';
import { createEvent, editEvent } from '../../services/EventService';
import './EventForm.css';

const EventForm = ({ event, onSave }) => {
    const [name, setName] = useState(event ? event.name : '');
    const [date, setDate] = useState(event ? new Date(event.date).toISOString().slice(0, 16) : '');
    const [maxParticipants, setMaxParticipants] = useState(event ? event.maxParticipants : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = { name, date, maxParticipants };

        if (event) {
            editEvent(event._id, eventData)
                .then(onSave)
                .catch(error => console.error('Error editing event:', error));
        } else {
            createEvent(eventData)
                .then(onSave)
                .catch(error => console.error('Error creating event:', error));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="event-form">
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Date:
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>
            <label>
                Max Participants:
                <input
                    type="number"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    required
                    min="1"
                />
            </label>
            <button type="submit">{event ? 'Save Changes' : 'Create Event'}</button>
        </form>
    );
};

export default EventForm;
