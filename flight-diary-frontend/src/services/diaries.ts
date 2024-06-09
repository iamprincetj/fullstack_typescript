import axios from 'axios';
import { DiaryBase, NewDiary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaries = async () => {
    const request = await axios.get<DiaryBase[]>(baseUrl);
    return request.data;
};

const createNewDiary = async (data: NewDiary) => {
    const request = await axios.post<DiaryBase>(baseUrl, data);
    return request.data;
};

export default { getAllDiaries, createNewDiary };
