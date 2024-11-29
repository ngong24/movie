const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        user_id: String,
        tickets: [
            {
                movie_id: String,
                adult_quantity: Number,
                child_quantity: Number,
            }
        ],
        popcorns: [
            {
                popcorn_id: String,
                popcorn_quantity: Number
            }
        ],
        seats: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Ticket = mongoose.model('Ticket', ticketSchema, "tickets"); // tickets: connection in database

module.exports = Ticket;