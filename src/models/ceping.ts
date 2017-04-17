import mongoose = require('mongoose');

// 考试内容内容分类
var cepingSchema = new mongoose.Schema({
    title: String,
    type: String,
    radio: {
        A: String,
        B: String,
        C: String,
        D: String,
        correct: String
    },
    createDt: { type: Date, default: Date.now },
    updateDt: { type: Date, default: Date.now },
    isCategory: {
        type: Boolean,
        default: false
    },
    isAnwser: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    jieda: { type: String, default: '没有解答' }

});


export interface ICeping extends mongoose.Document {
    avatar: string;
    name: string;
    password: string;
    gender: string;
    email: string;
    signature: string;

}

export var cepingModel = mongoose.model<ICeping>('Ceping', cepingSchema);