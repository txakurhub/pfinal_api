const { Router } = require("express");
const router = Router();
//--------------------------IMPORT
const shoesRouter = require("./shoes");
const customersRouter = require("./customer")
const categoriesRouter = require("./categories")
const reviewsRouter = require("./review")
const paymentsRouter = require("./payments")
const wishlistRouter = require("./wishlist")
const orderRouter = require("./order")
//--------------------------ROUTES

router.use("/shoes", shoesRouter);
router.use("/categories", categoriesRouter);
router.use("/customers", customersRouter);
router.use("/reviews", reviewsRouter);
router.use("/payments", paymentsRouter)
router.use("/wishlist", wishlistRouter)
router.use("/order", orderRouter)


module.exports = router;
