import {
    Diagnosis,
    Discharge,
    EntryWithoutId,
    Gender,
    HealthCheckRating,
    NewPatient,
    SickLeave,
} from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown, type: string): string => {
    if (!isString(str)) {
        throw new Error(`Incorrect or missing ${type}`);
    }

    return str;
};

const parseName = (name: unknown): string => {
    return parseString(name, 'name');
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }

    return date;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender)
        .map((g) => g.toString())
        .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    return parseString(occupation, 'occupation');
};

const parseSsn = (ssn: unknown): string => {
    return parseString(ssn, 'ssn');
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object
    ) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            ssn: parseSsn(object.ssn),
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};

// New Entry

const parseSpecialist = (specialist: unknown): string => {
    return parseString(specialist, 'specialist');
};

const parseDescription = (description: unknown): string => {
    return parseString(description, 'description');
};

const parseEmployerName = (employerName: unknown): string => {
    return parseString(employerName, "employer's name");
};

const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing discharge data');
    }

    if ('date' in object && 'criteria' in object) {
        const discharge: Discharge = {
            date: parseDate(object.date),
            criteria: parseString(object.criteria, 'discharge criteria'),
        };
        return discharge;
    }

    throw new Error('Incorrect discharge data: some fields are missing');
};

const isHealthCheck = (rating: number): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating)
        .map((r) => r)
        .includes(rating);
};

const parseHealthCheck = (rating: unknown): HealthCheckRating => {
    console.log('here');
    if (typeof rating !== 'number' || !isHealthCheck(rating)) {
        throw new Error(`Value of healthCheckRating incorrect: ${rating}`);
    }

    return rating;
};

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing sick leave data');
    }

    if ('startDate' in object && 'endDate' in object) {
        const newSickLeave: SickLeave = {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate),
        };

        return newSickLeave;
    }

    throw new Error('Incorrect sick leave data: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing diagnoses code');
    }

    return object as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing entry data');
    }

    if ('type' in object) {
        switch (object.type) {
            case 'Hospital':
                console.log(object.type);
                if (
                    'date' in object &&
                    'specialist' in object &&
                    'description' in object &&
                    'discharge' in object &&
                    'diagnosisCodes' in object
                ) {
                    const entry: EntryWithoutId = {
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        description: parseDescription(object.description),
                        discharge: parseDischarge(object.discharge),
                        diagnosisCodes: parseDiagnosisCodes(
                            object.diagnosisCodes
                        ),
                        type: object.type,
                    };

                    return entry;
                }
                break;
            case 'OccupationalHealthcare':
                console.log(object.type);
                if (
                    'date' in object &&
                    'specialist' in object &&
                    'description' in object &&
                    'employerName' in object &&
                    'diagnosisCodes' in object &&
                    'sickLeave' in object
                ) {
                    const entry: EntryWithoutId = {
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        description: parseDescription(object.description),
                        diagnosisCodes: parseDiagnosisCodes(
                            object.diagnosisCodes
                        ),
                        employerName: parseEmployerName(object.employerName),
                        sickLeave: parseSickLeave(object.sickLeave),
                        type: object.type,
                    };

                    return entry;
                }
                break;
            case 'HealthCheck':
                console.log(object);
                if (
                    'date' in object &&
                    'specialist' in object &&
                    'description' in object &&
                    'diagnosisCodes' in object &&
                    'healthCheckRating' in object
                ) {
                    const entry: EntryWithoutId = {
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        description: parseDescription(object.description),
                        diagnosisCodes: parseDiagnosisCodes(
                            object.diagnosisCodes
                        ),
                        healthCheckRating: parseHealthCheck(
                            object.healthCheckRating
                        ),
                        type: object.type,
                    };

                    return entry;
                }
        }
    }

    throw new Error('Incorrect entry data: some fields are missing');
};

export default toNewPatient;
