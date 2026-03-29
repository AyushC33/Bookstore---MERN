import express from 'express';
import {PORT, mongodbURI} from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksroute.js'
import cors from 'cors';

const app = express();

//Middle for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['content-Type']
// }));

app.get("/", (req, res) =>{
    res.send("Welcome to MERN Tutorial")
});

app.use("/books", booksRoute)

mongoose.connect(mongodbURI)
.then(() => {
    console.log("App connected to database");
})
.catch((err) =>{
    console.log(err.message);
});

app.listen(PORT, () =>{
    console.log(`App is running on port ${PORT}`)
});

