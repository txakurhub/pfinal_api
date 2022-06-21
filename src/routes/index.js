const { Router } = require("express");
const router = Router();
//--------------------------IMPORT
const shoesRouter = require("./shoes");
const customersRouter = require("./customer")
const categoriesRouter = require("./categories")
//--------------------------ROUTES

router.use("/shoes", shoesRouter);
router.use("/categories", categoriesRouter)
router.use("/customers", customersRouter);


module.exports = router;
