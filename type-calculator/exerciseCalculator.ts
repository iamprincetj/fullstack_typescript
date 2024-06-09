import { calculateExercises } from './helper';

interface ParsedValues {
    target: number;
    myList: number[];
}

const parseArguments = (args: string[]): ParsedValues => {
    if (args.length > 13) throw new Error('Too many arguments!');
    if (args.length < 10) throw new Error('Not enough arguments!');

    const myListNum: number[] = args.slice(3).map(Number);

    if (isNaN(Number(args[2])) || myListNum.includes(NaN)) {
        throw new Error('Provided values were not numbers!');
    } else {
        return {
            target: Number(args[2]),
            myList: myListNum,
        };
    }
};

try {
    const { target, myList } = parseArguments(process.argv);
    console.log(calculateExercises(myList, target));
} catch (error: unknown) {
    let errorMessage = 'An error occurred';
    if (error instanceof Error) {
        errorMessage += ': ' + error.message;
    }
    console.log(errorMessage);
}
