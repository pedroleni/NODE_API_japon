const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(

{
    images: [{type: String, unique: true, required: true}],
    name: {type: String, unique: true, required: true},
    description: [{type: String, unique: true, required: true}],

},

{
    timestamps: true
}
);

module.exports = mongoose.model('manga', schema);