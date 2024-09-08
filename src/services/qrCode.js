const models = require("../models");
const logger = require('../logger')




const addQrCode = async (
    identifiant,
    montant

) => {
    const qrCode = models.QrCode({
        identifiant, montant
    })
    logger.info('start saving new qrCode')
    try {
        await qrCode.save();
        logger.info('qrCode saved')
        return { success: true, identifiant }
    } catch (error) {
        return { success: false }
    }

}

const generateQrFiche = async (fiche) => {
    const promises = fiche?.map(async elt => {
        return await addQrCode(elt?.identifiant, elt?.montant);
    });

    const result = await Promise?.all(promises);
    return result;
};


const getAllQrCode = async () => {
    logger.info('start getting all qrCodes')
    const allQrCodes = await models.QrCode.find({}).sort('-createdAt')
    if (allQrCodes) {
        return { success: true, qrCodes: allQrCodes }
    } else {
        return { success: false }
    }
}


const checkQrCode = async (identifiant) => {
    const qrCode = await models.QrCode.findOne({ identifiant })
    if (qrCode) {
        if (qrCode?.state == "valide") {
            const test = await models.QrCode.findOneAndUpdate(
                { identifiant },
                { $set: { scannedAt: Date.now(), state: "used" } },
                { new: true }
            );
            return { success: true, montant: qrCode?.montant, creationDate: qrCode?.createdAt, statut: "valide" }
        } else if (qrCode?.state == "used") {
            return { success: true, montant: qrCode?.montant, scannedAt: qrCode?.scannedAt, statut: "used" }
        }
        //  else if (qrCode?.state == "expired") {
        //     return { success: true, qr_statut: "expired" }
        // } else if (qrCode?.state == "destroyed") {
        //     return { success: true, qr_statut: "destroyed" }
        // }
    } else {
        return { success: false, qr_statut: 'notFound' }
    }
}


const deleteQrCode = async (identifiant) => {
    const deleteElt = await models.QrCode.findOneAndDelete({ identifiant })
    if (deleteElt) {
        return { sucess: true }
    }
    return { success: false }
}


module.exports = {
    addQrCode, getAllQrCode, checkQrCode, generateQrFiche, deleteQrCode
}