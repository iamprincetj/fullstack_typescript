import { calculateBmi } from './helper';

interface ParsedValuesBmi {
    value0: number;
    value1: number;
}

const parseArgumentsBmi = (args: string[]): ParsedValuesBmi => {
    if (args.length > 4) throw new Error('Too many arguments!');
    if (args.length < 4) throw new Error('Not enough arguments!');

    if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
        throw new Error('Provided values were not numbers!');
    } else {
        return {
            value0: Number(args[2]),
            value1: Number(args[3]),
        };
    }
};

try {
    const { value0, value1 } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(value0, value1));
} catch (error: unknown) {
    let errorMessage = 'An error occured';
    if (error instanceof Error) {
        errorMessage += ': ' + error.message;
    }

    console.log(errorMessage);
}
