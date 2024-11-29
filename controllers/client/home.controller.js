const Product = require("../../models/movie.model");

// [GET] /
module.exports.index = async (req, res) => {
    // Lấy ra phim nổi bật
    const moviesFeatured = await Product.find({
        featured: "1",
        status: "active",
        deleted: false
    }).limit(4);

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        // --> view (index.pug - home)
        moviesFeatured: moviesFeatured
    });
};