const Movie = require("../../models/movie.model");

// [GET] /search
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword; //nhận keyword gửi từ form

    // Tìm phim
    let movies = [];
    if (keyword) {
        const regex = new RegExp(keyword, "i");
        movies = await Movie.find({
            title: regex,
            status: "active",
            deleted: false
        });
    };

    res.render("client/pages/search/index.pug", {
        pageTitle: "Tìm kiếm phim",
        // --> view (index.pug - movies)
        keyword: keyword,
        movies: movies
    });
}