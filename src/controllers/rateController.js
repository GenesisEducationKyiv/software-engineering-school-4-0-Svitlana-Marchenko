const rateService = require('../services/rateService')
const logger = require('../helpers/logger')

const getRate = async (req, res) => {
    try {
        logger.debug(`Getting currency rate`)
        const exchangeRate = await rateService.getExchangeRate()
        res.json(exchangeRate)
    } catch (error) {
        logger.error('Error fetching exchange rate: ' + error.message)
        res.status(400).json({ message: 'Error fetching exchange rate' })
    }
}

module.exports = {
    getRate,
}
