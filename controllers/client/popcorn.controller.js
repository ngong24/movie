const Popcorn = require("../../models/popcorn.model");

// [GET] popcorns
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const popcorns = await Popcorn.find(find);

    res.render("client/pages/popcorns/index.pug", {
        pageTitle: "Đặt bắp nước",
        popcorns: popcorns
    });
};