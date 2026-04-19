import { verifyToken } from '../utils/token.js';
 
const authenticate = (req, res, next) => {
        try {
        const authHeader = req.headers.authorization;
 
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header is required' });
        }
 
        const token = authHeader.split(' ')[1];
        const decodedToken = verifyToken(token);
        req.userId = decodedToken.userId;
        next();
} catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré' });
}
};
 
export default authenticate;

 