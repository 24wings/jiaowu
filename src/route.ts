import { homeRouter, userRouter, adminRouter } from './routes';
import express = require('express');


var router = express.Router();
router.use('/', homeRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);

export { router as allRouter }



