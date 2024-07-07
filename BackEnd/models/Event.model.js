const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        required: true 
    },
    maxParticipants: { 
        type: Number, 
        required: true 
    },
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    participants: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User' }],
    registeredPokemons: [
        {
            userId: { 
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true },
            pokemons: { 
                type: [String], 
                required: true }
        }
    ]
});

module.exports = mongoose.model('Event', EventSchema);
