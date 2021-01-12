const { Schema, model } = require('mongoose')

//Schema Data Structure of data will be saved

const courseSchema = new Schema({
    name: {type: String, required: true},
    duration: {type: String, required: true},
    startDate: {type: String, required: true, default: Date.now}, //format 2012-04-23T18:25:43.511Z
    endDate: {type: String, required: true},
    place: {type: String, required: true},
    dayTime: {type: String, required: true, default: 'Day'},
    description: {type: String, required: true},
    tags: [{type: String}],
    updateByAdminId: {type: String},
    image: {type: String}
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model('Course', courseSchema)