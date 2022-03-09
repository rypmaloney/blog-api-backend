let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let labelSchema = new Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model('Label', labelSchema);
