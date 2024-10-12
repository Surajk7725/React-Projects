import express from 'express';
import UserModel from '../models/User.js';
import {jwtSecret} from '../config/keys.js';
import auth from '../middleware/auth.js';
import bcrypt from 'bcryptjs';  // Hash the passwords
import jwt from 'jsonwebtoken'; // create tokens from register and sends to client.


const router = express.Router();

router.post('/register',async(request,response) => {
    const { name, email, password, confirmPassword } = request.body;
    try {
        let user = await UserModel.findOne({email});
        if(user) {
            return response.status(400).json({message:"User already exists"});
        }

        // Create a new User
        user = new UserModel({
            name,
            email,
            password,
            confirmPassword
        });

        // random string added to the password to make it secure
        const salt = await bcrypt.genSalt(10);

        // (user's passowrd + generated salt) with the help of hashing algorithm produces a hashed version of password
        user.password = await bcrypt.hash(password,salt);
        user.confirmPassword = await bcrypt.hash(confirmPassword,salt);

        await user.save();

        // payload created for the JSON Web Token(JWT)
        const payload = {
            user : {
                id: user.id,
                name: user.name
            }
        };

        // It creates a new JWT and token will expire in 1hr.
        jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            response.cookie('token', token, { httpOnly: true }); // If token is created successfully then it is set as an HTTP-only cookie.
            response.json({ token }); // sent back to response body
        });
        
    } catch(err) {
        console.error(err.message);
        response.status(500).send('Server Error');
    }
});

router.post('/login', async(request,response) => {
    const {email,password} = request.body;
    try {
        let user = await UserModel.findOne({email});
        if(!user) {
            return response.status(400).json({message:'Invalid Credentials'});
        }

        const match = await bcrypt.compare(password,user.password);
        if(!match)
            return response.status(400).json({message:'Invalid Credentials'});

        const payload = {
            user : {
                id : user.id,
                name: user.name
            }
        };

        jwt.sign(payload, jwtSecret, {expiresIn:'1h'}, (err, token) => {
            if(err) throw err;
            response.cookie('token',token,{httpOnly:true});
            response.json({token});
        });

    } catch (err) {
        console.error(err.message);
        response.status(500).send("Server Error");
    }
});

router.get('/current_user', auth, async (request, response) => {
    try {
      const user = await UserModel.findById(request.user.id).select('-password');
      response.json(user);
    } catch (err) {
      console.error(err.message);
      response.status(500).send('Server Error');
    }
});

router.get('/logout',(request,response) => {
    response.clearCookie('token');
    response.json({message:"Logged Out"});
});



export default router;