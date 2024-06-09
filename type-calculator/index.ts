import express = require('express');
import { calculateBmi, calculateExercises } from './helper';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const queryList = Object.values(req.query).map(Number);

    if (!req.query || queryList.includes(NaN)) {
        res.status(400).json({
            error: 'malformatted parameters',
        });
    } else {
        const { height, weight } = req.query;

        res.json({
            weight: Number(weight),
            height: Number(height),
            bmi: calculateBmi(Number(height), Number(weight)),
        });
    }
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    const myList = daily_exercises.map(Number);

    if (!daily_exercises || !target) {
        res.status(400).json({
            error: 'parameters missing',
        });
    } else if (isNaN(target) || myList.includes(NaN)) {
        res.status(400).json({
            error: 'malformatted parameters',
        });
    } else {
        const returnValue = calculateExercises(myList, target);
        res.json(returnValue);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port  ${PORT}`);
});
