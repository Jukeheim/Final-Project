const Event = require('../models/Event.model')

module.exports.createEvent = (req, res, next) => {
    const { name, date, maxParticipants } = req.body
    const createdBy = req.currentUserId

    const newEvent = new Event ({
        name,
        date,
        maxParticipants,
        createdBy
    })

    newEvent.save()
    .then(event => res.status(201).json(event))
    .catch(error => {
        error.status = 400;
        next(error)
    })
}


module.exports.editEvent = (req, res, next) => {
    const { id } = req.params
    const { name , date, maxParticipants } = req.body

    Event.findOneAndUpdate
    ({ _id: id, createdBy: req.currentUserId},
    { name, date, maxParticipants },
    { new: true})
    .then(event => {
        if(!event){
            return res.status(404).json({message : "Event not found"})
        }
        res.json(event)
    })
    .catch(error => next(error))
}

module.exports.deleteEvent = (req, res, next) => {
    const { id } = req.params

    Event
    .findOneAndDelete({ _id: id, createdBy: req.currentUserId})
    .then(event => {
        if(!event){
            return res.status(404).json({ message: "event not found"})
        }
        res.json({message : "event deleted"})
    })
    .catch(error => next(error))
}

module.exports.joinEvent = (req, res, next) => {
    const { id } = req.params

    Event
    .findById(id)
    .then(event => {
        if(!event){
            return res.status(404).json({ message: "event not found"})
        }
        if(event.participants.length >= event.maxParticipants){
            return res.status(400).json({ message: "event is full"})
        }
        if(event.participants.includes(req.currentUserId)){
            return res.status(400).json({ message : "already joined"})
        }

        event.participants.push(req.currentUserId)
        return event.save()
    })
    .then(event => res.json(event))
    .catch(error => next(error))
}

module.exports.registerPokemon = (req, res, next) => {
    const { id } = req.params;
    const { pokemons } = req.body;

    if (!Array.isArray(pokemons) || pokemons.length !== 3) {
        return res.status(400).json({ message: "You must register exactly 3 pokemons" });
    }

    Event.findById(id)
        .then(event => {
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
            if (event.registeredPokemons.some(p => p.userId.equals(req.currentUserId))) {
                return res.status(400).json({ message: "Pokemons already registered" });
            }
            event.registeredPokemons.push({ userId: req.currentUserId, pokemons });
            return event.save();
        })
        .then(event => res.json(event))
        .catch(error => {
            console.error("Error registering pokemons:", error);
            res.status(500).json({ message: "Failed to register pokemons. Please try again later." });
        });
};


module.exports.getEventList = (req, res, next) => {
    Event
    .find()
    .populate('createdBy')  
    .populate('participants')
    .then(events => res.json(events))
    .catch(error => next(error))
};

module.exports.getEventDetail = (req, res, next) => {
    const { id } = req.params;

    Event.findById(id)
        .populate('createdBy', 'username')
        .populate('participants', 'username')
        .then(event => {
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.json(event);
        })
        .catch(error => next(error));
};


