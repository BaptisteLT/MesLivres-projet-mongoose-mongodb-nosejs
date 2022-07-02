const mongoose = require('mongoose');
const { Schema } = mongoose;

const booksSchema = new Schema({
    titre:{type:String, required: true},
    auteur:{type: String, required: true},
    type:{type: String, required: true},
    description:{type: String, required: true},
    nbPages: {type: Number, min: 0, required: true},
},
{
    timestamp: true
});

const Book = mongoose.model('books', booksSchema)
module.exports = Book;