const express = require("express");
const router = express.Router();
const controllers = require("../controllers");



router.post('/login', controllers.admin.login)

// router.use('/admin', adminRouter)



module.exports = router;
