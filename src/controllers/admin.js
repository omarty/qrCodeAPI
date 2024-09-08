const adminService = require('../services/admin')


const login = async (req, res) => {
    const { phoneNumber, password } = req.body
    res.json( await adminService.login(phoneNumber, password))
}


module.exports = {
    login
}