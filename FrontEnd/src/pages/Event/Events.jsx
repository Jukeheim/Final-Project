import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventList, joinEvent } from "../../services/EventService";
import "./Events.css";

function Events({ user }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleEvents, setVisibleEvents] = useState(8);
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getEventList()
            .then(data => {
                setEvents(data || []);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleJoin = (id) => {
        joinEvent(id)
            .then(updatedEvent => {
                setEvents(events.map(event => event._id === id ? updatedEvent : event));
                handleDetail(id);
            })
            .catch(error => setAlertMessage(error.message));
    };

    const handleCreate = () => {
        navigate('/event-form');
    };

    const handleDetail = (id) => {
        navigate(`/events/${id}`);
    };

    const loadMoreEvents = () => {
        setVisibleEvents(prevVisibleEvents => prevVisibleEvents + 8);
    };

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>Error loading events: {error}</div>;
    }

    return (
        <div className="events-container">
            <h1>Events</h1>
            {alertMessage && <div className="alert">{alertMessage}</div>}
            <button onClick={handleCreate} className="create-event-button">Create Event</button>
            <ul className="events-list">
                {events.length > 0 ? (
                    events.slice(0, visibleEvents).map(event => (
                        event && event._id && (
                            <li key={event._id} className="event-item">
                                <div className="event-header">
                                    <h2>{event.name}</h2>
                                    <p>Participants: {event.participants.length}/{event.maxParticipants}</p>
                                </div>
                                <div className="event-actions">
                                    <button onClick={() => handleJoin(event._id)}>Join</button>
                                    <button onClick={() => handleDetail(event._id)}>Details</button>
                                </div>
                            </li>
                        )
                    ))
                ) : (
                    <li>No events available</li>
                )}
            </ul>
            {visibleEvents < events.length && (
                <button onClick={loadMoreEvents} className="load-more">Load More</button>
            )}
        </div>
    );
}

export default Events;
