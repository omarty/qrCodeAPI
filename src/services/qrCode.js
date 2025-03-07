const models = require("../models");
const logger = require('../logger');
const { DateTime } = require("luxon");




const addQrCode = async (
    identifiant,
    montant

) => {
    const expiredAt= DateTime.now().plus({ years: 1 });
    const qrCode = models.QrCode({
        identifiant, montant, expiredAt
    })
    logger.info('start saving new qrCode')
    try {
        await qrCode.save();
        logger.info('qrCode saved')
        return { success: true, identifiant, expiredAt }
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
    const qrCode = await models.QrCode.findOne({ identifiant });

    if (!qrCode) {
        return { success: false, qr_statut: 'notFound' };
    }

    // Vérification si déjà expiré
    if (qrCode.state === "expired") {
        return { success: true, montant: qrCode?.montant, expiredAt: qrCode?.expiredAt, statut: "expired" };
    }

    // Vérification de l'expiration
    const expiredAt = DateTime.fromJSDate(qrCode?.expiredAt); // Conversion en Luxon DateTime
    if (expiredAt < DateTime.now()) {
        await models.QrCode.findOneAndUpdate(
            { identifiant },
            { $set: { state: "expired" } },
            { new: true }
        );
        return { success: true, montant: qrCode.montant, expiredAt: qrCode?.expiredAt, statut: "expired" };
    }

    // Vérification de l'état "valide"
    if (qrCode.state === "valide") {
        const updatedQrCode = await models.QrCode.findOneAndUpdate(
            { identifiant },
            { $set: { scannedAt: new Date(), state: "used" } }, // Utilisation de `new Date()`
            { new: true }
        );
        return { success: true, montant: updatedQrCode.montant, creationDate: updatedQrCode.createdAt, statut: "valide" };
    }

    // Vérification de l'état "used"
    if (qrCode.state === "used") {
        return { success: true, montant: qrCode.montant, scannedAt: qrCode.scannedAt, statut: "used" };
    }
};



const deleteQrCode = async (identifiant) => {
    const deleteElt = await models.QrCode.findOneAndDelete({ identifiant })
    if (deleteElt) {
        return { sucess: true }
    }
    return { success: false }
}

const deleteAll = async () => {
    const result = await models.QrCode.deleteMany({});
    
    if (result.deletedCount > 0) {
        return { success: true, deletedCount: result.deletedCount };
    }
    
    return { success: false, message: "No documents found to delete" };
};



module.exports = {
    addQrCode, getAllQrCode, checkQrCode, generateQrFiche, deleteQrCode, deleteAll
}