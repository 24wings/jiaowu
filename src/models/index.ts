import mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wanviv');

export { IAdmin, adminModel } from './admin';
export { IUser, userModel } from './user';
export { IWebwork, webworkModel } from './webwork';
export { anwserQuestionModel, IAnwserQuestion } from './anwser-question';
export { categoryModel, ICategory } from './category';
export { paperAnwserModel, IPaperAnwser } from './paper-anwser';
export { paperModel, IPaper } from './paper';
export { radioQuestionModel, IRadioQuestion } from './radio-question';
export { wordModel, IWord } from './word';
