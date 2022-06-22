const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email:{type:String, unique: true},
    prenom:{type: String, required: true},
    nom: String,
    age: {type: Number, min: 0}
},
{
    timestamp: true
});

const User = mongoose.model('User', userSchema)
module.exports = User;