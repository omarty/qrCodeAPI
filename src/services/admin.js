const models = require("../models");
const logger = require('../logger')


const login = async (phoneNumber, password) => {
    console.log(phoneNumber)
    const retrivedAdmin = await models.Admin.findOne({ phoneNumber: phoneNumber })
    if (retrivedAdmin) {

        if (password == retrivedAdmin?.password) return { success: true , message: "ok"}
        return { success: false, message: "password" }
    }
    return {
        success: false, message: 'notFound'
    }
}


module.exports = {
    login
}