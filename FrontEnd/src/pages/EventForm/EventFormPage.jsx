import { useNavigate, useLocation } from "react-router-dom";
import EventForm from "../../components/EventForm/EventForm";


function EventFormPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const event = location.state?.event || null;

    const handleSave = (savedEvent) => {
        navigate('/events', { state: { updatedEvent: savedEvent } });
    };

    return (
        <div className="event-form-page">
            <h1>{event ? 'Edit Event' : 'Create Event'}</h1>
            <EventForm event={event} onSave={handleSave} />
        </div>
    );
}

export default EventFormPage;
