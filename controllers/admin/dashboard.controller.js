
// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang tổng quan",
        currentPage: "dashboard"
    });
}