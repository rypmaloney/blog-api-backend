let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    parent: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    body_text: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, required: true },
});

//Virtual for pretty date
commentSchema.virtual('prettyDate').get(function () {
    return this.date.toDateString();
});

module.exports = mongoose.model('Comment', commentSchema);
