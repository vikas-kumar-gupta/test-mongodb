const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    username : {
        type: 'string',
        require: true,
        unique: true
    },
    password : {
        type: 'string', 
        require: true
    },
    user_detail : {
        type: Schema.Types.ObjectId,
        ref: "User_Detail"
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User