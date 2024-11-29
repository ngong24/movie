const Movie = require("../../models/movie.model");
const Popcorn = require("../../models/popcorn.model");
const Ticket = require("../../models/ticket.model");

// [GET] /movies
module.exports.index = async (req, res) => {
    // lấy ds phim từ DB
    const movies = await Movie.find({
        status: "active",
        deleted: false
    });

    res.render("client/pages/movies/index.pug", {
        pageTitle: "Danh sách phim",
        // --> view (index.pug - movies)
        movies: movies
    });
};

// [GET] /movies/detail/:slugMovie
module.exports.detail = async (req, res) => {
    try {
        const find = {
            slug: req.params.slugMovie,
            status: "active",
            deleted: false
        };

        // Tìm phim trong DB
        const movies = await Movie.findOne(find);

        // Tìm bắp nước
        const popcorns = await Popcorn.find({
            deleted: false,
            status: "active"
        });

        // Tổng tiền
        const ticketId = req.cookies.ticketId;
        const ticket = await Ticket.findOne({
            _id: ticketId
        });

        if(ticket.tickets.length > 0) {
            for (const item of ticket.tickets) {
                const movieId = item.movie_id;
                const movieInfo = await Movie.findOne({
                    _id: movieId
                }).select("title ticket_prices.adult ticket_prices.child");

                item.movieInfo = movieInfo;
                item.totalPrice = movieInfo.ticket_prices.adult * item.adult_quantity
                                + movieInfo.ticket_prices.child * item.child_quantity;
            };
        };

        ticket.totalPrice = ticket.tickets.reduce((sum, item) => sum + item.totalPrice, 0);

        // console.log(ticket);

        res.render("client/pages/movies/detail.pug", {
            pageTitle: "Chi tiết phim",
            // --> view (detail.pug - movies)
            movies: movies,
            popcorns: popcorns,
            ticket: ticket
        });
    } catch (error) {
        res.redirect(`/movies`);
    };
};