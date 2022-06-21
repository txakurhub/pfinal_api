const { Router } = require("express");
const router = Router()

//--------------------------IMPORT
const shoesRouter = require("./shoes");
const customersRouter = require("./customer")
//--------------------------ROUTES
router.use("/shoes", shoesRouter);

router.use("/customers", customersRouter);


module.exports = router;
