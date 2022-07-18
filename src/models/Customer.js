const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Customer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING,
        unique:true,
        primaryKey:true
      },
      password: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },user_banned:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
      is_admin:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
      }
      ,
      default_shipping_address: {
        type: DataTypes.TEXT,
      },
    }, { timestamps: false });
};
