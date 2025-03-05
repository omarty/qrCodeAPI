const qrCodeService = require('../services/qrCode')


const getAllQrCode = async (req, res) => {
    res.json(await qrCodeService.getAllQrCode());
}

const checkQrCode = async (req, res) => {
    const { identifiant } = req.body
    res.json(await qrCodeService.checkQrCode(identifiant));
}

const generateFiche = async (req, res) => {
    const { fiche } = req.body
    res.json(await qrCodeService.generateQrFiche(fiche));
}


const deleteQrCode= async(req, res)=> {
    const identifiant= req.body.identifiant
    res.json(await qrCodeService.deleteQrCode(identifiant))
}

const deleteAll= async(req, res)=> {
    res.json(await qrCodeService.deleteAll())
}

module.exports = {
    getAllQrCode, checkQrCode, generateFiche, deleteQrCode, deleteAll
}