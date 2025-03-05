const express = require("express");
const router = express.Router();
const controllers = require("../controllers");



router.post('/generateFiche', controllers.qrCode.generateFiche)
router.post('/checkQrCode', controllers.qrCode.checkQrCode)
router.get('/', controllers.qrCode.getAllQrCode)
router.delete('/all', controllers.qrCode.deleteAll)
router.delete('/', controllers.qrCode.deleteQrCode)



module.exports = router;
