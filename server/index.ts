import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyparser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from './passport-init';
import printReq from './middleware/printReq'

import {MONGODB_URI} from './configuration';

import listingsRouter from './routes/listingsRouter';
import listingRouter from './routes/listingRouter';

import authRouter from './routes/authRouter'

const PORT = process.env.PORT || 8080;


// Import routes

// Connecting to MongoDB
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => console.log("Database connection established.") )
.catch(err => console.log(err));

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(printReq);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join('..', 'build')));


// Routing
app.use('/listings', listingsRouter);
app.use('/listing', listingRouter);

app.use('/auth', authRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'build', 'index.html'));
})


let server = app.listen( PORT, () => console.log(`Server started on port ${PORT}`));
export default server;