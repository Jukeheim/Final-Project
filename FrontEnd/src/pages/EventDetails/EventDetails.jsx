import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventDetail, deleteEvent } from '../../services/EventService';
import RegisterPokemons from '../../components/RegisterPokemon/RegisterPokemon';
import { AuthContext } from '../../contexts/AuthContext';
import { RingLoader } from 'react-spinners';
import './EventDetails.css';

const EventDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getEventDetail(id)
            .then(data => setEvent(data))
            .catch(error => setError(error.message));
    }, [id]);

    const handleDelete = () => {
        deleteEvent(id)
            .then(() => {
                alert('Event deleted successfully');
                navigate('/events');
            })
            .catch(error => {
                console.error('Error deleting event:', error);
                alert('Failed to delete event. Please try again later.');
            });
    };

    const handleEdit = () => {
        navigate(`/event-form`, { state: { event } });
    };

    if (error) {
        return <div>Error loading event details: {error}</div>;
    }

    if (!event) {
        return (
            <div className="loader-container">
                <RingLoader color="#36d7b7" size={150} />
            </div>
        );
    }

    const isEventCreator = user && event.createdBy._id === user._id;
    const userRegistered = user && event.registeredPokemons.some(reg => reg.userId === user._id);

    return (
        <div className="event-detail-container">
            <h1>{event.name}</h1>
            <p>Date: {new Date(event.date).toLocaleString()}</p>
            <p>Max Participants: {event.maxParticipants}</p>
            {isEventCreator && (
                <div className="event-actions">
                    <button onClick={handleEdit} className="edit-event-button">Edit Event</button>
                    <button onClick={handleDelete} className="delete-event-button">Delete Event</button>
                </div>
            )}
            <div className="participants-section">
                <h2>Participants:</h2>
                <div className="participants-list">
                    {event.participants.map(participant => (
                        <div key={participant._id} className="participant-card">
                            <h3>{participant.username}</h3>
                            <p>Pokémon Registered:</p>
                            <ul>
                                {event.registeredPokemons
                                    .filter(reg => reg.userId === participant._id)
                                    .map(reg => reg.pokemons.map(pokemon => (
                                        <li key={pokemon}>{pokemon}</li>
                                    )))
                                }
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            {!userRegistered && (
                <RegisterPokemons eventId={event._id} onRegister={() => {
                    getEventDetail(id).then(setEvent).catch(console.error);
                }} />
            )}
        </div>
    );
};

export default EventDetail;
