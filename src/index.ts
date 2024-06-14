import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Game from './models/games';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://tic-tac-toe-xo-1.web.app/'
    ],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))

mongoose.connect('mongodb+srv://anusornsriprom44:AMgxxhOKIHmlXUua@cluster0.bmiggf1.mongodb.net/tic-tac-toe')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Connection error:', error));

app.use((req: Request, res: Response, next: Function) => {
    console.log("Request received:", req.method, req.url);
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.post('/api/save-game', async (req: Request, res: Response) => {
    const gameData = req.body.data;
    console.log(gameData);
    const game = new Game(gameData);

    try {
        await game.save();
        res.status(201).send({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});
app.get('/api/get-history', async (req: Request, res: Response) => {
    try {
        const HistoryData = await Game.find({}, { _id: 0 });
        res.status(200).json(HistoryData)
    } catch (error) {
        console.error('Error retrieving game history: ', error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
