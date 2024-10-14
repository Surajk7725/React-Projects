import userModels from "../models/user.js"

// Create User
const Createuser = async(request,response) => {
    try {
        const {name,fatherName,email,phone} = request.body

        const NewUser = new userModels({
        name,fatherName,email,phone  
    })
    await NewUser.save();
    response.status(200).json({success:true,message:'User Created Successfully',NewUser});
    } catch(error) {
        console.log(error);
        response.status(500).json({success:false,mesaage:'Server Error',NewUser});
    }
}

// Get User
const GetUser = async(request,response) => {
    try {
        const user = await userModels.find()
        if(!user) {
            return response.status(404).json({success:false,message:"User not found"});
        }
        response.status(200).json({success:true,user});
    } catch(error) {
        console.log(error);
        return response.status(500).json({success:false,message:"Internal Server Error"});
    }
}

// Update User
const UpdateUser = async(request,response) => {
    try {
        const UserID = request.params.id;
        const updatedUser = await userModels.findByIdAndUpdate(UserID,request.body,
            {new:true});
        if(!updatedUser) {
            return response.status(404).json({success:false,message:"User not updated"});
        }
        return response.status(200).json({success:true,message:"User Updated Successfully",updatedUser});
    } catch(error) {
        console.log(error);
        return response.status(500).json({success:false,message:"Internal Server Error"});
    }
}

// Delete user
const Deleteuser = async(request,response) => {
    try {
        const UserId = request.params.id;
        const deletedUser = await userModels.findByIdAndDelete(UserId);
        if (! deletedUser) {
            return response.status(404).json({success:false,message:"User Not Found"})
        }
        return response.status(200).json({success:true,message:"User Deleted Successfully",deletedUser});
    } catch(error) {
        console.log(error);
        return response.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export {Createuser, GetUser, UpdateUser, Deleteuser}