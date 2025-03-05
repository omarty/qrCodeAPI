const mongoose = require('mongoose')
const { Schema, model } = mongoose;
mongoose.set('strictQuery', true);

const qrCodeSchema = new Schema({

    identifiant: {
        type: String,
        require: true,
        maxlength: 250
    },

    serie: {
        type: String,
        require: true,
        maxlength: 250
    },

    state: {
        type: String,
        require: true,
        enum: {
            values: ["valide", "used", "expired"],
            message: '{VALUE} is not supported!'
        },
        default: "valide"
    },

    expiredAt: {
        type: Date
    },

    montant: {
        type: String,
        require: true,
        // enum: {
        //     values: ["10000", "20000", "50000", "100000"],
        //     message: '{VALUE} is not supported!'
        // },
    },

    scannedAt: {
        type: Date
    }


},
    {
        timestamps: true
    })




const qrCode = model("QrCode", qrCodeSchema);
module.exports = qrCode