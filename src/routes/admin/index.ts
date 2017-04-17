import express = require('express');
import mongoose = require('mongoose');
import { IWord, wordModel, cepingModel, ICeping, categoryModel, ICategory } from '../../models';

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
router.route('/signout').post(async (req, res) => {
    req.session.admin = null;
    res.redirect('/admin/signin');
})

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

// 列表
router.route('/ceping')
    .get(async (req, res, next) => {
        var list = await cepingModel.find().populate('category').exec();

        res.render('admin/ceping', {
            list
        });
    })
    // 是
    .post(async (req, res, next) => {
        /**
         *  单选题  type:radio
         *  
         */
        var type = req.body.type;
        var result = await new cepingModel({
            type: req.body.type,
            title: req.body.title,
            'radio.A': req.body.A, 'radio.B': req.body.B,
            'radio.C': req.body.C,
            'radio.D': req.body.D,
            'radio.correct': req.body.correct,
            'jieda': req.body.jieda
        }).save()
        res.redirect('/admin/ceping')
    }).delete(async (req, res, next) => {
        var action = await cepingModel.findById(req.body._id).remove().exec();
        res.json({
            issuccess: true,
            action
        });
    });
router.route('/ceping/:_id').get(async (req, res, next) => {
    var ceping = await cepingModel.findById(req.params._id).exec();
    var categorys = await categoryModel.find().exec();
    res.render('admin/ceping_detail', {
        ceping, categorys
    });
})
    .post(async (req, res, next) => {
        var action = await cepingModel.findById(req.params._id).update(req.body).exec();
        res.redirect('/admin/ceping');


    })
router.route('/category')
    .get(async (req, res, next) => {
        var categorys = await categoryModel.find().exec();
        res.render('admin/category', {
            categorys
        });
    })
    // 增加题目分类
    .post(async (req, res, next) => {
        var category = await new categoryModel({ title: req.body.title }).save();
        res.redirect('/admin/category');
    });



//
router.route('/category/:_id')

    // 获取页面
    .get(async (req, res, next) => {
        var category = await categoryModel.findOne({ _id: req.params._id }).exec();

        var cepings = await cepingModel.find().exec();
        var list = [];
        res.render('admin/category_detail', {
            category: category,
            cepings,
            list
        });
    })
    // 添加题目
    .post(async (req, res, next) => {

        var category = await categoryModel.update({ _id: req.params._id }, req.body
        ).exec();
        category = await categoryModel.findById(req.params._id).exec();
        res.render('admin/category_detail', {
            success: '保存成功',
            category
        });
    })

    // 移出问题
    .delete(async (req, res, next) => {
        var data = await categoryModel.findById(req.params._id).remove().exec();
        res.json({
            issuccess: true,
            data
        });
    })
export { router as adminRouter };