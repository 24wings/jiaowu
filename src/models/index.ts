import mongoose = require('mongoose');

mongoose.connect('mongodb://118.89.38.111/wanviv');

export { IAdmin, adminModel } from './admin';
export { IUser, userModel } from './user';
export { IWebwork, webworkModel } from './webwork';
export { cepingModel, ICeping } from './ceping';
export { categoryModel, ICategory } from './category';
export { paperAnwserModel, IPaperAnwser } from './paper-anwser';
export { paperModel, IPaper } from './paper';
export { radioQuestionModel, IRadioQuestion } from './radio-question';
export { wordModel, IWord } from './word';
