import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/keys.js';

const auth = (request,response,next) => {
    const token = request.cookies.token;
    if(!token) 
        return response.status(401).json({message:"No token, Authorization denied"});
    try {
        const decoded = jwt.verify(token,jwtSecret);
        request.user = decoded.user;
        next();
    } catch(error) {
        response.status(401).json({message:"Token is not valid"});
    }
};

export default auth;