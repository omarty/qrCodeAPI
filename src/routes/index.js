const express = require('express')
const router = express.Router();
const adminRouter = require('./admin')
const qrCodeRouter = require('./qrCode')

router.use('/admin', adminRouter)
router.use('/qrCode', qrCodeRouter)



module.exports = router;