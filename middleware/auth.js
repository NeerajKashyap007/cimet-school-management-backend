// /middleware/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'nfkjjfjfghjfhjhajhjhafhdhjhfhvbdhbfjbdjbjnbasdjbna';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ status: false, message: 'Token has expired' });
            }

            return res.status(403).json({ status: false, message: 'Token not valid' });
        }
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
        if (decodedToken.exp < currentTime) {
            return res.status(403).json({ status: false, message: 'Token has expired' });
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;
