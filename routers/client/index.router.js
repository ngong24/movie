// File tổng chứa các router
const homeRouter = require("./home.router");
const movieRouter = require("./movie.router");
const userRouter = require("./user.router");
const searchRouter = require("./search.router");
const ticketRouter = require("./ticket.router");
const popcornRouter = require("./popcorn.router");
const checkoutRouter = require("./checkout.router");

const userMiddleware = require("../../middlewares/client/user.middleware");
const ticketMiddleware = require("../../middlewares/client/ticket.middleware");


module.exports = (app) => {
    app.use(userMiddleware.infoUser);
    app.use(ticketMiddleware.ticketId);

    app.use("/", homeRouter);

    app.use("/movies", movieRouter);

    app.use("/user", userRouter);

    app.use("/search", searchRouter);

    app.use("/ticket", ticketRouter);

    app.use("/popcorns", popcornRouter);

    app.use("/checkout", checkoutRouter);


};