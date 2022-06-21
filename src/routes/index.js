const { Router } = require("express");
const router = Router();
const axios = require('axios');
const { Op } = require('sequelize');

//--------------------------IMPORT
const shoesRouter = require("./shoes");

//--------------------------ROUTES
router.use("/shoes", shoesRouter);

module.exports = router;
