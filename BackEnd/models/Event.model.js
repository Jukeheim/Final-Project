const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema ({
    name : {
        type : String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    maxParticipants : {
        type: Number,
        required: true
    },
    participants : 
        [{type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
   },
    registeredPokemons: [{
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true 
        },
        pokemons: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Pokemon', 
            required: true 
        }]
    }]
    
})

const Event = mongoose.model('Event', eventSchema)