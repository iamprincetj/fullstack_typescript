interface ReturnedValue {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateBmi = (height: number, weight: number) => {
    const heightToMeter = height / 100;
    const bmi = weight / (heightToMeter * heightToMeter);

    switch (true) {
        case bmi < 18.5:
            return 'Underweight';
        case bmi >= 18.5 && bmi <= 24.9:
            return 'Normal (healthy weight)';
        case bmi >= 25 && bmi <= 29.9:
            return 'Overweight';
        case bmi >= 30:
            return 'Obese';
        default:
            return 'Invalid input';
    }
};

export const calculateExercises = (
    myList: number[],
    target: number
): ReturnedValue => {
    const periodLength = myList.length;
    const trainingDays = myList.filter((day) => day !== 0).length;
    const average = myList.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    let rating = 1;
    let ratingDescription = 'bad';

    if (average >= target) {
        rating = 3;
        ratingDescription = 'good';
    } else if (average < target / 2) {
        rating = 1;
        ratingDescription = 'bad';
    } else {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};
