const mongoose = require("mongoose");

const popcornSchema = new mongoose.Schema(
    {
        title: String, 
        description: String,
        price: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        createdBy: {
            account_id: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedBy: {
            account_id: String,
            deletedAt: Date
        },
        updatedBy: [
            {
                account_id: String,
                updatedAt: Date
            }
        ],
    },
    {
        timestamps: true
    }
);

const Popcorn = mongoose.model('Popcorn', popcornSchema, "popcorns"); // popcorns: connection in database

module.exports = Popcorn;