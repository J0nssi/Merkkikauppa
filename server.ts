import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyparser from 'body-parser';

const PORT = process.env.PORT || 8080;
const MONGODB_URI = 'mongodb://mongo:27017/appdb';

//import routes
import listingRouter from './routes/listingRouter';

// Connecting to MongoDB
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Database connection established.") )
.catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'build')));


app.use('/listings', listingRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})



let server = app.listen( PORT, () => console.log(`Server started on port ${PORT}`));
export default server;