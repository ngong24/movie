const Movie = require("../../models/movie.model");
const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

// [GET] /admin/movies
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    // Tìm tất cả phim để in ra giao diện
    const movies = await Movie.find(find);

    // Hiển thị lịch sử thay đổi sản phẩm
    for (const movie of movies) {
        // lấy ra thông tin người tạo
        const user = await Account.findOne({
            _id: movie.createdBy.account_id
        });

        if(user) {
            movie.accountFullName = user.fullName; // thêm key accountFullName vào movies
        };
    }

    res.render("admin/pages/movies/index.pug", {
        pageTitle: "Danh sách phim",
        // --> view (index.pug - movies)
        currentPage: "movies",
        movies: movies
    });
};

// [GET] /admin/movies/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/movies/create.pug", {
        pageTitle: "Thêm mới phim",
        currentPage: "movies"
    });
};

// [POST] /admin/movies/create
module.exports.createPost = async (req, res) => {
    req.body.ticket_prices.adult = parseInt(req.body.ticket_prices.adult);
    req.body.ticket_prices.child = parseInt(req.body.ticket_prices.child);

    // Kiểm tra vị trí được điền hay không
    if(req.body.position == ""){
        const countMovies = await Movie.countDocuments();
        req.body.position = countMovies + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    // Kiểm tra lịch sử thay đổi sản phẩm
    req.body.createdBy = { //gắn giá trị cho trường createBy trong bảng
        account_id: res.locals.user.id
    }

    // Lưu vào DB
    const movie = new Movie(req.body);
    await movie.save();

    req.flash("success", "Tạo sản phẩm thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/movies`);
};