const { Router } = require("express");
const router = Router();

//--------------------------IMPORT
const shoesRouter = require("./shoes");

//--------------------------ROUTES
router.use("/shoes", shoesRouter);

module.exports = router;
