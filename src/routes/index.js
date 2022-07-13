const { Router } = require("express");
const router = Router();

//--------------------------IMPORT
const shoesRouter = require("./shoes");
const customersRouter = require("./customer");
const categoriesRouter = require("./categories");
const reviewsRouter = require("./review");
const paymentsRouter = require("./payments");
const wishlistRouter = require("./wishlist");
const orderRouter = require("./order");
const usersRouter = require("./users");
const sendMail = require("./sendMail");
const paypal = require("./paypal");

//--------------------------ROUTES
router.use("/shoes", shoesRouter);
router.use("/categories", categoriesRouter);
router.use("/customers", usersRouter);
router.use("/reviews", reviewsRouter);
router.use("/payments", paymentsRouter);
router.use("/wishlist", wishlistRouter);
router.use("/order", orderRouter);
router.use("/email", sendMail);
router.use("/paypal", paypal);

module.exports = router;
