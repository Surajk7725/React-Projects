import mongoose from "mongoose";

const dbCon = () => {
    try {
        mongoose.connect(process.env.DB_URL)
        console.log("Database connected");
    } catch( error ) {
        console.log(error);
    }
}

export default dbCon;