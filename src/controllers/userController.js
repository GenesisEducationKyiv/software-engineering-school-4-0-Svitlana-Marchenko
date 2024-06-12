const userService = require('../services/userService')
const logger = require('../helpers/logger')

const subscribeEmail = async (req, res) => {
    const { email } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        logger.error(`Invalid email ${email} address`)
        return res.status(400).json({ message: `Invalid email address` })
    }

    try {
        const result = await userService.subscribeEmail(email)

        if (!result) {
            logger.error(`Email ${email} is already in the database`)
            return res.status(409).json({
                message: `Email ${email} is already in the database`,
            })
        }

        logger.info(`Email ${email} was added to the database`)
        return res.status(200).json({
            message: `New email was added to the database`,
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    subscribeEmail,
}
