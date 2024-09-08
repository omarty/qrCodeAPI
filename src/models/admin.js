const mongoose = require('mongoose')
const { Schema, model } = mongoose;
mongoose.set('strictQuery', true);

const adminSchema = new Schema({

    firstName: {
        type: String,
        require: true,
        maxlength: 250
    },

    lastName: {
        type: String,
        require: true,
        maxlength: 250
    },

    phoneNumber: {
        type: String,
        require: true,
        maxlength: 90
    },

    password: {
        type: String,
        require: true,
    },




},
    {
        timestamps: true
    })




const admin = model("Admin", adminSchema);
module.exports = admin