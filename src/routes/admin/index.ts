import express = require('express');
import { IWord, wordModel } from '../../models';

import { checkAdminLogin, adminUpload, parseFilepath } from '../../middlewares';


var router = express.Router();

router.route('/')
    .get(checkAdminLogin, async (req, res) => {
        res.render('admin/index');
    });

router.route('/signin').get(async (req, res) => {
    res.render('admin/signin');
})
    .post(async (req, res) => {
        var { name, password } = req.body;
        if (name == '1' && password == 1) {
            req.session.admin = { name, password };
            res.redirect('/admin/');
        } else {
            res.render('admin/signin', { error: '密码错误' });
        }
    });

router.route('/word').get(async (req, res, next) => {
    var category = req.query.category;
    var words = [];
    if (category) {
        words = await wordModel.find({ category: category }).exec();
    } else {
        words = await wordModel.find().exec();
    }
    console.log(words);
    res.render('admin/word', { words });
});
router.route('/word/upload').get(async (req, res) => {
    res.render('admin/upload_word');
})
    .post(adminUpload.any(), parseFilepath, async (req, res, next) => {
        console.log(req.body);
        var files: Express.Multer.File[] = <any>req.files;
        var words = files.map(file => file.path);
        var word = await new wordModel({ words, title: req.body.title, category: req.body.category }).save();
        res.render('admin/upload_word', {
            success: '上传成功'
        });
    })
router.route('/word/').get(async (req, res) => {
    res.render('home/word');
});
export { router as adminRouter };