import mongoose = require('mongoose');

// 系统管理员名字
var userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    password: String,
    gender: String,
    email: String,
    signature: String,
    createDt: { type: Date, default: Date.now },
    updateDt: { type: Date, default: Date.now },
    // 已经回答的　单选题测评
    radios: {
        type: [{
            ceping: { type: mongoose.Schema.Types.ObjectId, ref: 'Ceping' },
            anwser: String
        }], default: []
    }

});


export interface IUser extends mongoose.Document {
    avatar: string;
    name: string;
    password: string;
    gender: string;
    email: string;
    signature: string;

}

export var userModel = mongoose.model<IUser>('User', userSchema);