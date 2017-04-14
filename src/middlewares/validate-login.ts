import express = require('express');

function checkStudentLogin(req: express.Request, res: express.Response, next) {
    if (res.locals.student) {
        next();
    } else {
        // 或者渲染一个权限不够,请先登录界面,然后5秒自动转向登录界面
        res.redirect('/signin');
    }
}

export { checkStudentLogin };