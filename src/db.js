require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const DATABASE_URL  = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Category, Customer, Order, Product, Review, Wishlist } =
  sequelize.models;

Category.belongsToMany(Product, { through: "category_product" });
Product.belongsToMany(Category, { through: "category_product" });

Customer.belongsToMany(Order, { through: "customer_order" });
Order.belongsToMany(Customer, { through: "customer_order" });

Order.belongsToMany(Product, { through: "order_product" });
Product.belongsToMany(Order, { through: "order_product" });

Product.hasMany(Review);
Review.belongsTo(Product);

Wishlist.belongsToMany(Product, { through: "wishlist_product" });
Product.belongsToMany(Wishlist, { through: "wishlist_product" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
