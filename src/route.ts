import { homeRouter, workRouter, adminRouter } from './routes';
import express = require('express');


var router = express.Router();
router.use('/', homeRouter);
router.use('/work', workRouter);
router.use('/admin', adminRouter);

export { router as allRouter }



