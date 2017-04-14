import multer = require('multer');
import fs = require('fs');
import path = require('path');
import url = require('url');
/**
 * 用户上传的函数,
 * 会存放在  /public/uploads/用户id-5位随机数
 */
export var userUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            var randomNum = req.session.user._id + '-' + (Math.random() * 1000000).toFixed();
            var newDir = path.join(__dirname, '../../public/uploads/' + randomNum);
            fs.existsSync(newDir) ? '' : fs.mkdirSync(newDir);
            cb(null, `public/uploads/${randomNum}/`)
        },
        filename: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        }
    })
});

export var adminUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {

            var newDir = path.join(__dirname, '../../public/uploads/admin');
            fs.existsSync(newDir) ? '' : fs.mkdirSync(newDir);
            cb(null, `public/uploads/admin/`);
        },
        filename: function (req, file, cb) {
            console.log(file);
            // file.path = file.path = url.resolve('/', file.path.replace('public', ''));
            cb(null, file.originalname);
        }
    })
});
export function parseFilepath(req, res, next) {
    req.files.forEach(file => {
        file.path = url.resolve('/', file.path.replace('public', ''));
    });
    next();
}