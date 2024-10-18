import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import { generateBoardMatrix } from './game_interface/util/board_util'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3003;

// let initialBoardState = generateBoardMatrix()

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/*
app.get('/ibm', (req, res) => {
    console.log(initialBoardState)
    res._write(initialBoardState)
})
*/

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});