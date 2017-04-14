import mongoose = require('mongoose');

// 系统管理员名字
var webworkSchema = new mongoose.Schema({
    title: String,
    summary: String,
    codeFiles: [String],
    preview: String,
    entry: String,
    createDt: { type: Date, default: Date.now },
    updateDt: { type: Date, default: Date.now },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


export interface IWebwork extends mongoose.Document {
    title: string;
    summary: string;
    preview: string;
    /**
     * 入口文件
     */
    entry: string;
    codeFiles: [string];
    updateDt: Date;
    createDt: Date;
}

export var webworkModel = mongoose.model<IWebwork>('WebWork', webworkSchema);