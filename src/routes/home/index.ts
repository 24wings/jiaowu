import express = require('express');
import { userModel, IUser } from '../../models';


var router = express.Router();

router.route('/')
    .get(async (req, res) => {
        res.render('home/index');
    });

router.route('/signin')
    .get(async (req, res) => {
        res.render('home/signin')
    })
    .post(async (req, res) => {
        var { name, password } = req.body;
        var user = await userModel.findOne({ name, password }).exec();
        if (user) {
            req.session.user = user;
            res.redirect('work')

        } else {
            res.render('home/signin', { error: '用户名不正确' })
        }
    });

router.route('/signup')
    .get(async (req, res) => {
        res.render('home/signup')
    }).post(async (req, res) => {
        var { name, password } = req.body;
        var action = await new userModel({ name, password }).save();

        req.session.user = action;
        res.redirect('/');
    });
router.route('/safepdf')
    .get(async (req, res, next) => {
        var { url } = req.query;
        res.render('home/safepdf', { url });
    });
export { router as homeRouter };