const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


let PostSchema = new Schema({
    message: {type: String, required: true},
    user: {type: Schema.Types.ObjectID, ref: 'User', required: true},
    time: {type: Date, default: new Date()}
});


// PostSchema.pre('save', function (next) {
//     let post = this;
//     post.date = new Date();
//     next()
// });


const PostModel = Mongoose.model('Post', PostSchema);

module.exports = PostModel;
