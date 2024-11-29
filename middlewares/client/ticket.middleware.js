const Ticket = require("../../models/ticket.model");

// Đặt vé không cần đăng nhập
module.exports.ticketId = async (req, res, next) => {
    // console.log(req.cookies.ticketId);

    if (!req.cookies.ticketId) {
        // Tạo vé (Chưa có)
        const ticket = new Ticket();
        await ticket.save();
        // console.log(ticket);

        const expiresCookies = 7 * 24 * 60 * 1000; //30 * 24 * 60 * 60 * 1000
        res.cookie("ticketId", ticket.id, {
            expires: new Date(Date.now() + expiresCookies)
        });
    } else {
        // Lấy ra thôi (Nếu có)
        // const ticket = await Ticket.findOne({
        //     _id: req.cookies.ticketId
        // });

        // ticket.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        // res.locals.miniCart = ticket;
    };

    next();
};