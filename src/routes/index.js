const { Router } = require("express");


//--------------------------IMPORT
const shoesRouter = require("./shoes");
const customersRouter = require("./customer")
//--------------------------ROUTES
const router = Router();
router.use("/shoes", shoesRouter);

router.use("/customers", customersRouter);


module.exports = router;
