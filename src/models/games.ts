import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    event: String,
    option: String,
    date: String,
    white: String,
    black: String,
    result: String,
    history: [String]
});

const Game = mongoose.model('games', gameSchema);

export default Game;
