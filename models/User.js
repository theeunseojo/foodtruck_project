const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

// schema 생성 ==> 데이터의 자료형을 미리 지정하기 위해 사용.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
//        trim: true, // x e ctler@naver.com 이런 값이 들어왔을 때 trim 은 공백을 없애준다.
//        unique: 1 //중복된 값은 사용하지 못한다.
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

userSchema.pre('save', function(next) {
    var user = this

    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema) // model 생성
module.exports = User; // model을 다른 곳에서도 사용할 수 있도록 export