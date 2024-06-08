const { User } = require('../../db/models');

const createUser = async (email) => {
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return false;
        }
        await User.create({ email });
        return true;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const getAllEmails = async () => {
    try {
        const user = await User.findAll();
        return user.map(u => u.email);
    } catch (error) {
        throw new Error('Error getting all users email: ' + error.message);
    }
}

module.exports = {
    createUser,
    getAllEmails
};