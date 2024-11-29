const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const movieSchema = new mongoose.Schema(
    {
        title: String,
        movie_category: String,
        description: String,
        movie_content: String,
        thumbnail: String,
        status: String,
        duration: String,
        featured: String,
        country: String,
        position: Number,
        ticket_prices: {
            adult: {
                type: Number,
                default: 0
            },
            child: {
                type: Number,
                default: 0
            }
        },
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
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
        // deletedAt: Date
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

const Movie = mongoose.model('Movie', movieSchema, "movies");

module.exports = Movie;