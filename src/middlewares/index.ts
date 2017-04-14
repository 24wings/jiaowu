import express = require('express');
function checkParamsFromQuery(...params: string[]) {
    return (req: express.Request, res: express.Response, next) => {

        if (params.every(param => !!req.query[param])) {
            next();
        } else {
            res.render(req.originalUrl.substring(1), {
                error: '参数不合法'
            });
        }
    }
}

function checkParamsFromBody(...params: string[]) {
    return (req: express.Request, res: express.Response, next) => {
        console.log(req.path, req.url, req.originalUrl);
        if (params.every(param => !!req.body[param])) {
            next();
        } else {
            res.render(req.originalUrl.substring(1), {
                error: '参数不合法'
            });
        }
    }
}



export { checkParamsFromQuery, checkParamsFromBody };
export * from './loginCheck';
export { checkStudentLogin } from './validate-login';
export * from './multer';

