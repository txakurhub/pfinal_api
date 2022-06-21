const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    phone: {
      type: DataTypes.STRING
    },
    default_shipping_address: {
      type: DataTypes.TEXT
    }
  }, { timestamps: false });
};
