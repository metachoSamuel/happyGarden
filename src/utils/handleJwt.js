const { sign, verify } = require('jsonwebtoken');

const propertiesKey = {
    id_user: 'id_user'
}

const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async (user) => sign({
    [propertiesKey.id_user]: user[propertiesKey.id_user],
    role: user.role
}, JWT_SECRET, { expiresIn: "2h" });

const verifyToken = async (token) => {
    try {
        return verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    tokenSign,
    verifyToken
}