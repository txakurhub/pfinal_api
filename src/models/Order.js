const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shipping_address: {
        type: DataTypes.TEXT,
      },
      order_address: {
        type: DataTypes.TEXT,
      },
      order_email: {
        type: DataTypes.STRING,
      },
      order_date: {
        type: DataTypes.DATE,
      },
      order_status: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
