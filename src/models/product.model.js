const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const ProductCart = require("./productCart.model");

const Product = db.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 1.0,
    },
  },
  brand: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  availableQuantity: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
    },
    allowNull: false,
  },
  sales: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "pause"),
    allowNull: false,
    defaultValue: "active",
  },
});

Product.addHook("beforeSave", async (product, options) => {
  if (product.availableQuantity === 0) {
    product.status = "pause";
  } else if (product.status === "pause") {
    product.status = "active";
  }
});

Product.addHook("afterUpdate", async (product, options) => {
  if (product._previousDataValues.status !== product.status) {
    if (product.status === "pause") {
      const productCarts = await ProductCart.findAll({
        where: { productId: product.id },
      });

      productCarts.map((productCart) => {
        if (
          productCart.quantity > product.availableQuantity &&
          product.availableQuantity > 0
        ) {
          productCart.update({ quantity: product.availableQuantity });
        }
        productCart.update({ status: "pause" });
      });
    }
    if (product.status === "active") {
      const productCarts = await ProductCart.findAll({
        where: { productId: product.id },
      });

      productCarts.map((productCart) => {
        productCart.update({ status: "active" });
      });
    }
  }
});

module.exports = Product;
