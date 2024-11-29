const Popcorn = require("../../models/popcorn.model");
const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

// [GET] /admin/popcorn
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const popcorns = await Popcorn.find(find);

    for(const popcorn of popcorns) {
        const user = await Account.findOne({
            _id: popcorn.createdBy.account_id
        });

        if(user) {
            popcorn.accountFullName = user.fullName;
        };
    };

    res.render("admin/pages/popcorns/index.pug", {
        pageTitle: "Danh sách bắp nước",
        currentPage: "popcorns",
        popcorns: popcorns
    });
};

// [GET] /admin/popcorn/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/popcorns/create.pug", {
        pageTitle: "Tạo bắp nước",
        currentPage: "popcorns",
    });
};

// [POST] /admin/popcorn/create
module.exports.createPost = async (req, res) => {
    console.log(req.body);
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position === "") {
        const countPopcorn = await Popcorn.countDocuments();
        req.body.position = countPopcorn + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    };

    req.body.createdBy = { //gắn giá trị cho trường createBy trong bảng
        account_id: res.locals.user.id
    }

    const popcorn = new Popcorn(req.body);
    popcorn.save();

    req.flash("success", "Tạo sản phẩm thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/popcorns`);
};