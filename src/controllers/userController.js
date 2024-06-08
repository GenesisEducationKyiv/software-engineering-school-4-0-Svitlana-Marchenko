const userService = require('../services/userService')
const logger = require('../helpers/logger')

const createUser = async (req, res) => {
    const { email } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
        logger.error(`Invalid email ${email} address`)
        return res.status(400).json({ message: `Invalid email address` })
    }

    try {
        const result = await userService.createUser(email)
        if (result) {
            logger.info(`Email ${email} was added to the database`)
            res.status(200).json({
                message: `New email was added to the database`,
            })
        } else {
            logger.error(`Email ${email} is already in the database`)
            res.status(409).json({
                message: `Email is already in the database`,
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createUser,
}
