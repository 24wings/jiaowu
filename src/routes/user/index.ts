import express = require('express');
import { cepingModel, ICeping, IUser, userModel, webworkModel, categoryModel, ICategory } from '../../models';

import multer = require('multer');
import url = require('url');

import { checkLogin } from '../../middlewares';


import { userUpload, adminUpload } from '../../middlewares';



var router = express.Router();

router.route('/')
    .get(checkLogin, async (req, res, next) => {
        var works = await webworkModel.find({ uploader: req.session.user._id }).exec();
        console.log(works);
        res.render('user/index', { works });
    })
    .post(async (req, res, next) => {
        res.render('user/index');
    });
router.route('/upload')
    .get(async (req, res, next) => {
        res.render('work/upload');
    });



// 上传web前端作品
router.route('/upload/web')
    .post(checkLogin, userUpload.any(), async (req, res, next) => {
        console.log(req.files, req.body);
        var files: Express.Multer.File[] = <any>req.files;
        //解析所有文件的公共路径
        files.forEach(file => file.path = url.resolve('/', file.path.replace('public', '')));
        var entry = files[0].destination.replace('public', '') + 'index.html';
        var codeFiles = files.filter(file => {
            return file.fieldname == "files";
        }).map(file => file.path);
        var preview = files.find(file => file.fieldname == 'preview').path;
        var data = await new webworkModel({ entry, codeFiles, preview, uploader: req.session.user._id }).save();
        res.render('work/upload', {
            success: '上传成功,入口文件是' + entry
        });
    });

router.route('/category').get(async (req, res, next) => {
    var categorys = await categoryModel.find().exec();
    res.render('user/category', { categorys });
});
router.route('/category/:_id').get(checkLogin, async (req, res, next) => {

    var cepings = await cepingModel.find({ category: req.params._id }).exec();


    var category = await categoryModel.findById(req.params._id).exec();

    var cepings = await cepingModel.find({ category: req.params._id }).exec();
    console.log(req.session.user.radios);
    var data = [];
    req.session.user.radios.forEach(radio => {

        var item = cepings.find(ceping => ceping._id == radio.ceping);
        if (item) {
            item['isAnwser'] = true
            data.push(item);
        }
    });
    console.log('get:/category/:_id  --- cepings ' + cepings);
    res.render('user/category_detail', {
        category, cepings: data
    });
});
router.route('/ceping/:_id')
    .get(async (req, res, next) => {
        var ceping = await cepingModel.findById(req.params._id).exec();
        console.log(req.session.user);
        var userRadio = req.session.user.radios.find(radio => {
            console.log(radio.ceping.toString(), ceping._id.toString(), radio.ceping.toString() == ceping._id.toString());
            return radio.ceping.toString() == ceping._id.toString();
        });


        console.log(ceping, userRadio);
        res.render('user/ceping_detail', { ceping, userRadio });
    })
    .post(async (req, res, next) => {
        var action = await userModel.findByIdAndUpdate(req.session.user._id, {
            $addToSet: {
                radios: {
                    ceping: req.params._id,
                    anwser: req.body.anwser
                }
            }
        }).exec();
        var user = await userModel.findById(req.session.user._id).exec();
        console.log(user);
        req.session.user = user;

        res.redirect('/user/ceping/' + req.params._id);
    })
export { router as userRouter };