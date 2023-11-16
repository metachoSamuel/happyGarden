const {verifyToken} = require("./handleJwt");
const authenticateUser = async (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    const user = await verifyToken(token);
    if (!user) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
};

module.exports = authenticateUser;