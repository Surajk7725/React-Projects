import express from 'express';
import { Createuser, Deleteuser, GetUser, UpdateUser } from '../controllers/usercontroller.js';

const router = express.Router()

router.post('/create',Createuser);
router.get('/get',GetUser);
// PUT method is used to update a resource or create a new resource if it does not exist.
router.put('/update/:id',UpdateUser);  // We can update a particular user by using it's ID.
router.delete('/delete/:id',Deleteuser);

export default router