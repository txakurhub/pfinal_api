const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.TEXT,
      },
      brand: {
        type: DataTypes.STRING,
      },
      model: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
