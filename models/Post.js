let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    title: { type: String, required: true },
    body_text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    stage: { type: String, required: true },
    labels: [{ type: Schema.Types.ObjectId, ref: 'Label', required: false }],
});

//Virtual for messages's URL
postSchema.virtual('url').get(function () {
    return '/posts/' + this._id;
});

//Virtual to create pretty date
postSchema.virtual('prettyDate').get(function () {
    return this.date.toDateString();
});

module.exports = mongoose.model('Post', postSchema);
