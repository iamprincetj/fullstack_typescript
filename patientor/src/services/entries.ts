import axios from 'axios';
import { apiBaseUrl } from '../constants';

const createPatientEntry = async (id: string, data: unknown) => {
    const request = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        data
    );
    return request.data;
};

export default {
    createPatientEntry,
};
