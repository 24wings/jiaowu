import mongoose = require('mongoose');

// 系统管理员名字
var adminSchema = new mongoose.Schema({

    name: String,
    avatar: String,
    password: String,
    gender: String,
    email: String,
    signature: String,
    createDt: { type: Date, default: Date.now },
    updateDt: { type: Date, default: Date.now },

});


export interface IAdmin extends mongoose.Document {
    avatar: string;
    name: string;
    password: string;
    gender: string;
    email: string;
    signature: string;

}

export var adminModel = mongoose.model<IAdmin>('Admin', adminSchema);