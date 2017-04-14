import mongoose = require('mongoose');

// 单选题
var anwserQuestionSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    password: String,
    gender: String,
    email: String,
    signature: String,
    createDt: { type: Date, default: Date.now },
    updateDt: { type: Date, default: Date.now },

});


export interface IAnwserQuestion extends mongoose.Document {
    avatar: string;
    name: string;
    password: string;
    gender: string;
    email: string;
    signature: string;

}

export var anwserQuestionModel = mongoose.model<IAnwserQuestion>('AnwserQuestion', anwserQuestionSchema);