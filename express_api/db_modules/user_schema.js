const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs');

//Schema Data Structure of data will be saved

const userSchema = new Schema({
    firstName: {type: String, required: true},
    secondName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    place: {type: String, required: true},
    dayTime: {type: String, required: true, default: 'Day'},
    isAdmin: {type: Boolean}
}, {
    timestamps: true,
    versionKey: false,
})

// Events middleware
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            //this.saltSecret = salt;
            next();
        });
    });
});

module.exports = model('User', userSchema)