import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


const PORT = process.env.PORT || 5000;

let server = app.listen( PORT, () => console.log(`Server started on port ${PORT}`));
export default server;