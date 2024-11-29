const Ticket = require("../../models/ticket.model");

// [GET] /ticket (/movies/detail)
module.exports.index = async (req, res) => {
}

// [POST] /ticket/add/:movieId
module.exports.addPost = async (req, res) => {
    // console.log(req.body);
    const movieId = req.params.movieId;
    const adult_quantity = parseInt(req.body.adult_quantity) || 0;
    const child_quantity = parseInt(req.body.child_quantity) || 0;
    const ticketId = req.cookies.ticketId;
    const popcorns_id = req.body.popcorn_id;
    const popcorns_quantity = req.body.popcorn_quantity;
    const seats = req.body.seats;
    const theater = req.body.theater;
    const address = req.body.address;
    const time = req.body.time;
    const totalPrice = req.body.totalPrice;
    const adult_name = req.body.adult_name || '';
    const child_name = req.body.child_name || '';


    // Nếu đặt phim đó rồi thì chỉ tăng số lượng lên
    const ticket = await Ticket.findOne({
        _id: ticketId
    });
    // const existMovieInTicket = ticket.tickets.find(item => item.movie_id == movieId);
    // if (existMovieInTicket) {
    //     // Cập nhật lại
    //     await Ticket.updateOne(
    //         { _id: ticketId, "tickets.movie_id": movieId },
    //         {
    //             $set: {
    //                 'tickets.$.adult_quantity': adult_quantity,
    //                 'tickets.$.child_quantity': child_quantity
    //             },
    //         }
    //     );
    // } else {
    //     const objectTicketsModel = {
    //         movie_id: movieId,
    //         adult_quantity: adult_quantity,
    //         child_quantity: child_quantity,
    //     };

    //     await Ticket.updateOne({ _id: ticketId }, {
    //         // data save
    //         $push: { tickets: objectTicketsModel },
    //     });

    //     // popcorns
    //     const objectPopcornModel = popcorns_id.map((id, index) => {
    //         const quantity = parseInt(popcorns_quantity[index] || 0)
    //         if (quantity > 0) {
    //             return {
    //                 popcorn_id: id,
    //                 popcorn_quantity: quantity
    //             }
    //         }
    //     }).filter(Boolean);

    //     if (objectPopcornModel.length > 0) {
    //         await Ticket.updateOne(
    //             { _id: ticketId },
    //             { $push: { popcorns: { $each: objectPopcornModel } } }
    //         );
    //     };

    //     // seats
    //     await Ticket.updateOne(
    //         { _id: ticketId },
    //         { $push: { seats: { $each: seats } } }
    //     );
    // };

    ticket.theater = theater;
    ticket.address = address;
    ticket.time = time;
    ticket.totalPrice = totalPrice;
    ticket.adult_name = adult_name;
    ticket.child_name = child_name;
    // console.log(ticket);

    req.flash("success", "Bạn đã đặt vé, vui lòng thanh toán!");
    res.redirect("/checkout");
};




