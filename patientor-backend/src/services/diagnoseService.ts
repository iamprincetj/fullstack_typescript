import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagonoses = (): Diagnosis[] => {
    return diagnosesData;
};

export default {
    getDiagonoses,
};
