import axios from 'axios';
import { Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

    return data;
};

const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        object
    );

    return data;
};

const getPatient = async (id: string) => {
    const request = await axios.get(`${apiBaseUrl}/patients/${id}`);
    return request.data;
};

const getDiagnoses = async () => {
    const request = await axios.get(`${apiBaseUrl}/diagnoses`);
    return request.data;
};

export default {
    getAll,
    create,
    getPatient,
    getDiagnoses,
};
