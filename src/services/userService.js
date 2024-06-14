const { User } = require('../../db/models')

const subscribeEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email: email } })
        if (user) {
           return
        }
        return await User.create({ email })
    } catch (error) {
        throw new Error('Error creating user: ' + error.message)
    }
}

const getAllEmails = async () => {
    try {
        const user = await User.findAll()
        return user.map((u) => u.email)
    } catch (error) {
        throw new Error('Error getting all users email: ' + error.message)
    }
}

module.exports = {
    subscribeEmail,
    getAllEmails,
}
