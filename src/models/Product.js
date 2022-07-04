const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
        type: DataTypes.FLOAT,
      },
      category:{
        type:DataTypes.STRING
      },
      stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      sold:{
        type:DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    { timestamps: false }
  );
};
