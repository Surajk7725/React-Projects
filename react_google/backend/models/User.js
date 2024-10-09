import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  displayName: { type: String },
  email: { type: String }
});

const User = mongoose.model('User',UserSchema);

export default User;

