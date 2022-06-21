const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "wishlist",
    {
      userId: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
