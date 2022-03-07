const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailSchema = Schema({
    firstName : {
        type: 'string',
        require: true
    },
    lastName : {
        type: 'string',
        require: false
    },
    phoneNumber : {
        type: 'number'
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const UserDetail = mongoose.model('User_Detail', userDetailSchema);

module.exports = UserDetail;