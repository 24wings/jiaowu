import express = require('express');
export function checkLogin(req: express.Request, res: express.Response, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('home/signin');
    }
}

export function checkAdminLogin(req: express.Request, res: express.Response, next) {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/admin/signin');
    }
}
