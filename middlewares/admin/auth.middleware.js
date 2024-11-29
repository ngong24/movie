// Tạo router private
const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
    // console.log(req.cookies.token);
    if (!req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
        const user = await Account.findOne({ token: req.cookies.token }).select("-password"); // kiểm tra token 
        if (!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        } else {


            //Trả thông tin user ra giao diện (bất kỳ file pug(controller) nào cũng có)
            res.locals.user = user;
            // res.locals.role = role;
            next();
        };
    };
}