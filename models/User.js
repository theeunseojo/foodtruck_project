const mongoose = require('mongoose');

// schema 생성 ==> 데이터의 자료형을 미리 지정하기 위해 사용.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{
        type: String
    },
    tolenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema) // model 생성
module.exports = User; // model을 다른 곳에서도 사용할 수 있도록 export