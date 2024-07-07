import { useEffect, useState } from "react"
import { deleteEvent, getEventList, joinEvent } from "../../services/EventService"
import EventForm from "../../components/EventForm/EventForm"
import RegisterPokemons from "../../components/RegisterPokemon/RegisterPokemon"

function Events({ user }) {
    const [events, setEvents] = useState([])
    const [error, setError] = useState(null)
    const [editingEvent, setEditingEvent] = useState(null)
    const [visibleEvents, setVisibleEvents] = useState(8) 

    useEffect(() => {
        getEventList()
            .then(data => setEvents(data || [])) 
            .catch(error => setError(error.message))
    }, [])

    const handleDelete = (id) => {
        deleteEvent(id)
            .then(() => setEvents(events.filter(event => event._id !== id)))
            .catch(error => setError(error.message))
    }

    const handleJoin = (id) => {
        joinEvent(id)
            .then(updatedEvent => setEvents(events.map(event => event._id === id ? updatedEvent : event)))
            .catch(error => setError(error.message))
    }

    const handleSave = (savedEvent) => {
        setEvents(events.map(event => event._id === savedEvent._id ? savedEvent : event))
        setEditingEvent(null)
    }

    const loadMoreEvents = () => {
        setVisibleEvents(prevVisibleEvents => prevVisibleEvents + 8)
    }

    if (error) {
        return <div>Error loading events: {error}</div>
    }

    return (
        <div>
            <h1>Events</h1>
            <EventForm event={editingEvent} onSave={handleSave} />
            <ul>
                {events.length > 0 ? (
                    events.slice(0, visibleEvents).map(event => (
                        <li key={event._id}>
                            <h2>{event.name}</h2>
                            <p>{new Date(event.date).toLocaleString()}</p>
                            <p>Participants: {event.participants.length}/{event.maxParticipants}</p>
                            {user && event.createdBy === user._id && (
                                <>
                                    <button onClick={() => setEditingEvent(event)}>Edit</button>
                                    <button onClick={() => handleDelete(event._id)}>Delete</button>
                                </>
                            )}
                            <button onClick={() => handleJoin(event._id)}>Join</button>
                            <RegisterPokemons eventId={event._id} onRegister={() => {
                                getEventList().then(setEvents).catch(console.error)
                            }} />
                        </li>
                    ))
                ) : (
                    <li>No events available</li>
                )}
            </ul>
            {visibleEvents < events.length && (
                <button onClick={loadMoreEvents}>Load More</button>
            )}
        </div>
    )
}

export default Events
