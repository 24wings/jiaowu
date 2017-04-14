import mongoose = require('mongoose');

// 考试内容内容分类
var wordSchema = new mongoose.Schema({
    title: String,
    words: [String],
    createDt: { type: Date, default: Date.now },
    updateDt: { type: Date, default: Date.now },
    category: String
});


export interface IWord extends mongoose.Document {
    title: string;
    words: [String];
    createDt: Date,
    updateDt: Date
}

export var wordModel = mongoose.model<IWord>('IWord', wordSchema);