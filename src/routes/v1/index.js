const express = require('express');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const productRouter = require('./product.router');
const productCartRouter = require('./productCart.router');
const purchaseRouter = require('./purchase.router');
const categoryRouter = require('./category.router');
const ratingRouter = require('./rating.route');

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/cart', productCartRouter);
router.use('/purchases', purchaseRouter);
router.use('/categories', categoryRouter);
router.use('/rating', ratingRouter);

module.exports = router;
