import express from 'express';
import calculateBmi from './bmiCalculator.ts';
import calculateExercises from './exerciseCalculator.ts';
const app = express();

const PORT = 3000;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.use(express.json())

app.get('/bmi', (req, res) => {

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (
        !req.query.height ||
        !req.query.weight ||
        isNaN(height) ||
        isNaN(weight)
    ) {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    const bmi = calculateBmi(height, weight);

    return res.json({
        weight,
        height,
        bmi 
    });
});

app.post('/exercises', (req, res) => {

    const body = req.body;

    if (
        body.daily_exercises === undefined ||
        body.target === undefined
    ) {
        return res.status(400).json({
            error: 'parameters missing'
        });
    }

    const target = Number(body.target);

    const dailyExercises = body.daily_exercises;

    if (
        isNaN(target) ||
        !Array.isArray(dailyExercises) ||
        dailyExercises.some(
            (value: unknown) => isNaN(Number(value))
        )
    ) {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    const hours = dailyExercises.map(
        (value: unknown) => Number(value)
    );

    const result =
        calculateExercises(hours, target);

    return res.json(result);
});


// app.get('/calculator', (_req, res) => {
//   res.send(_req.query);
// });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});