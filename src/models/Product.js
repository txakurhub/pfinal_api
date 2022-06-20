const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Product', {
    title: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER
    },
  }, { timestamps: false });
};
