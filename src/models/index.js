const Category = require("./category.model.js");
const ProductHistory = require("./history.model.js");
const Product = require("./product.model");
const ProductCart = require("./productCart.model");
const productImg = require("./productImg.model");
const Purchase = require("./purchase.model.js");
const Rating = require("./rating.model.js");
const User = require("./user.model");

User.hasMany(Product);
Product.belongsTo(User);

Product.hasMany(productImg);
productImg.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductCart);
ProductCart.belongsTo(Product);

User.hasMany(ProductCart);
ProductCart.belongsTo(User);

User.hasMany(Purchase);
Purchase.belongsTo(User);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Purchase.hasOne(Rating);
Rating.belongsTo(Purchase);

Rating.belongsTo(User);
User.hasMany(Rating);

User.hasMany(ProductHistory);
ProductHistory.belongsTo(User);

Product.hasMany(ProductHistory);
ProductHistory.belongsTo(Product);
