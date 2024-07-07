import { useState, useEffect } from "react"
import { createEvent, editEvent } from "../../services/EventService"

function EventForm({ event, onSave }) {
    const [name, setName] = useState(event?.name || '')
    const [date, setDate] = useState(event?.date || '')
    const [maxParticipants, setMaxParticipants] = useState(event?.maxParticipants || 6)

    useEffect(() => {
        setName(event?.name || '')
        setDate(event?.date || '')
        setMaxParticipants(event?.maxParticipants || 6)
    }, [event])

    const handleSubmit = (e) => {
        e.preventDefault()
        const eventData = {
            name,
            date,
            maxParticipants
        }
        if (event) {
            editEvent(event._id, eventData)
                .then(onSave)
                .catch(error => console.error('Error editing event', error))
        } else {
            createEvent(eventData)
                .then(onSave)
                .catch(error => console.error('Error creating event', error))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label>Date:</label>
            <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <label>Max Participants:</label>
            <input
                type="number"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                required
            />
            <button type="submit">{event ? 'Edit' : 'Create'} Event</button>
        </form>
    )
}

export default EventForm
