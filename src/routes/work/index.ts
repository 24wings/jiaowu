import express = require('express');
import multer = require('multer');
import url = require('url');

import { checkLogin } from '../../middlewares';

import { userModel, webworkModel } from '../../models';

import { userUpload, adminUpload } from '../../middlewares';


var router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        var works = await webworkModel.find({ uploader: req.session.user._id }).exec();
        console.log(works);
        res.render('work/index', { works });
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
export { router as workRouter };