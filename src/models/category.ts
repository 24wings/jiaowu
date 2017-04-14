import mongoose = require('mongoose');

// 考试内容内容分类
var categorySchema = new mongoose.Schema({
    name: String,
    avatar: String,
    password: String,
    gender: String,
    email: String,
    signature: String,
    createDt: { type: Date, default: Date.now },
    updateDt: { type: Date, default: Date.now },

});


export interface ICategory extends mongoose.Document {
    avatar: string;
    name: string;
    password: string;
    gender: string;
    email: string;
    signature: string;

}

export var categoryModel = mongoose.model<ICategory>('Category', categorySchema);