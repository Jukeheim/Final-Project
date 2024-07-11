import createHttp from "./BaseService";

const http = createHttp(true);

export function getEventList() {
    return http.get('/events');
}

export function getEventDetail(id) {
    return http.get(`/events/${id}`)
        .then(response => {
            console.log("Full response from API:", response);
            return response;
        })
        .catch(error => {
            console.error("Error fetching event details:", error);
            throw new Error("Failed to fetch event details. Please try again later.");
        });
}


export function createEvent(eventData) {
    return http.post('/events', eventData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error creating event', error);
            throw error;
        });
}

export function editEvent(id, eventData) {
    return http.put(`/events/${id}`, eventData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error editing event', error);
            throw error;
        });
}

export function deleteEvent(id) {
    return http.delete(`/events/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error deleting event:", error);
            throw new Error("Failed to delete event. Please try again later.");
        });
}

export function joinEvent(id) {
    return http.post(`/events/${id}/join`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error joining event:", error);
            throw new Error("Failed to join event. Please try again later.");
        });
}

export function registerPokemons(eventId, pokemons) {
    return http.post(`/events/${eventId}/register`, { pokemons })
        .then(response => response.data)
        .catch(error => {
            console.error("Error registering pokemons:", error);
            throw new Error("Failed to register pokemons. Please try again later.");
        });
}
