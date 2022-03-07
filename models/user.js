const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username : {
        type: 'string',
        require: true,
        unique: true
    },
    password : {
        type: 'string',
        require: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User