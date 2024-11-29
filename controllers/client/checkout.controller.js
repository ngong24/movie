

module.exports.index = async (req, res) => {
    res.render("client/pages/checkout/index.pug", {
        pageTitle: "Đặt hàng"
    })
}