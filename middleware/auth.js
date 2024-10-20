// /middleware/auth.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'nfkjjfjfghjfhjhajhjhafhdhjhfhvbdhbfjbdjbjnbasdjbna';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ status: false, message: 'Token has expired' });
            }

            return res.status(403).json({ status: false, message: 'Token is not valid' });
        }
        // Token is valid, attach the decoded user data to the request object
        req.user = decodedToken;
        next();
    });
};

export default authenticateToken;
