import patientData from '../../data/patients';
import {
    Entry,
    EntryWithoutId,
    NewPatient,
    NoSsnField,
    Patient,
} from '../types';
import { v1 as uuid } from 'uuid';

const getPatient = (): Patient[] => {
    return patientData;
};

const getNoSnn = (): NoSsnField[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatients = (object: NewPatient): Patient => {
    const newPatient = {
        ...object,
        id: uuid(),
        entries: [],
    };

    patientData.push(newPatient);
    return newPatient;
};

const addEntries = (object: EntryWithoutId, id: string): Entry => {
    const patient = patientData.find((p) => p.id === id);
    const newEntry = {
        ...object,
        id: uuid(),
    };
    patient?.entries.push(newEntry);
    return newEntry;
};

const findById = (id: string): Patient | null => {
    const patient = patientData.find((p) => p.id === id);
    if (!patient) {
        return null;
    }
    return patient;
};

export default {
    getPatient,
    getNoSnn,
    addPatients,
    findById,
    addEntries,
};
