
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

function calculateExercises(dailyHours: number[], target: number): Result {

    const periodLength = dailyHours.length;

    const trainingDays = dailyHours.filter(day => day > 0).length;

    const totalHours = dailyHours.reduce((sum, day) => sum + day, 0);

    const average = totalHours / periodLength;

    const success = average >= target;

    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = "Great job, target achieved";
    }
    else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "Not too bad but could be better";
    }
    else {
        rating = 1;
        ratingDescription = "You need to work harder";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

// console.log(
//     calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)
// );  

try {

    const args = process.argv.slice(2);

    if (args.length < 2) {
        throw new Error('Not enough arguments');
    }

    const numbers = args.map(arg => Number(arg));

    if (numbers.some(num => isNaN(num))) {
        throw new Error('Provided values were not numbers!');
    }

    const target = numbers[0];

    const dailyHours = numbers.slice(1);

    console.log(calculateExercises(dailyHours, target));

}
catch(error: unknown) {

    let errorMessage = 'Something bad happened.';

    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }

    console.log(errorMessage);
}

export default calculateExercises;