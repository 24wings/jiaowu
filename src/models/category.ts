import mongoose = require('mongoose');
import { ICeping } from './ceping';

// 考试内容内容分类
var categorySchema = new mongoose.Schema({
    title: String,
    createDt: { type: Date, default: Date.now },
    updateDt: { type: Date, default: Date.now },

});


export interface ICategory extends mongoose.Document {
    //标题
    title: String;
    ceping: [ICeping];
}

export var categoryModel = mongoose.model<ICategory>('Category', categorySchema);