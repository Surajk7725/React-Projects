import express from 'express';
import dbCon from './utlis/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routers/routes.js';

// method provided by dotenv module to config .env files.
dotenv.config(); 

const app = express()

// MongoDB
dbCon()

app.use(express.json())
app.use(cors())
app.use('/api',router)  //. Routing will be starts from /api + routes which are present in routes.js

app.listen(process.env.PORT,() =>{      // 5000 in .env is written process.env.PORT
    console.log("Running perfectly");
})