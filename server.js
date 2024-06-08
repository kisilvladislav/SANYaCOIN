const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/sanyacoin', { useNewUrlParser: true, useUnifiedTopology: true });

const playerSchema = new mongoose.Schema({
    username: String,
    score: Number
});

const Player = mongoose.model('Player', playerSchema);

app.post('/leaderboard', async (req, res) => {
    const { username, score } = req.body;
    let player = await Player.findOne({ username });

    if (player) {
        if (score > player.score) {
            player.score = score;
            await player.save();
        }
    } else {
        player = new Player({ username, score });
        await player.save();
    }

    res.status(200).send(player);
});

app.get('/leaderboard', async (req, res) => {
    const leaderboard = await Player.find().sort({ score: -1 }).limit(10);
    res.status(200).send(leaderboard);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
