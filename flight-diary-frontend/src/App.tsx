import React, { useEffect, useState } from 'react';
import diaryService from './services/diaries';
import { DiaryBase } from './types';
import { AxiosError } from 'axios';

const App = () => {
    const [diaries, setDiaries] = useState<DiaryBase[]>([]);
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const [notification, setNotification] = useState('');

    useEffect(() => {
        diaryService.getAllDiaries().then((res) => {
            setDiaries(res);
        });
    }, []);

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newDiary = {
            date,
            visibility,
            weather,
            comment,
        };
        try {
            const request = await diaryService.createNewDiary(newDiary);
            setNotification('Added new diary');
            setTimeout(() => {
                setNotification('');
            }, 5000);
            setDiaries([...diaries, request]);
        } catch (error) {
            if (error instanceof AxiosError) {
                setNotification(error.response?.data);
                setTimeout(() => {
                    setNotification('');
                }, 5000);
            }
        }
        setWeather('');
        setComment('');
        setDate('');
        setVisibility('');
    };
    return (
        <>
            <h2>Add new entry</h2>
            <p
                style={
                    notification.includes('Error')
                        ? { color: 'red' }
                        : { color: 'green' }
                }
            >
                {' '}
                {notification}{' '}
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    date
                    <input
                        type='date'
                        value={date}
                        onChange={({ target }) => setDate(target.value)}
                    />
                </div>

                <div>
                    visibility: {'  '}
                    great{'  '}
                    <input
                        type='radio'
                        name='visibility'
                        id='great'
                        onChange={({ target }) => setVisibility(target.id)}
                    />
                    good{' '}
                    <input
                        type='radio'
                        name='visibility'
                        id='good'
                        onChange={({ target }) => setVisibility(target.id)}
                    />
                    ok{' '}
                    <input
                        type='radio'
                        name='visibility'
                        id='ok'
                        onChange={({ target }) => setVisibility(target.id)}
                    />
                    poor{' '}
                    <input
                        type='radio'
                        name='visibility'
                        id='poor'
                        onChange={({ target }) => setVisibility(target.id)}
                    />
                </div>

                <div>
                    weather: sunny{'  '}
                    <input
                        type='radio'
                        name='weather'
                        id='sunny'
                        onChange={({ target }) => setWeather(target.id)}
                    />
                    rainy{' '}
                    <input
                        type='radio'
                        name='weather'
                        id='rainy'
                        onChange={({ target }) => setWeather(target.id)}
                    />
                    cloudy{' '}
                    <input
                        type='radio'
                        name='weather'
                        id='cloudy'
                        onChange={({ target }) => setWeather(target.id)}
                    />
                    stormy{' '}
                    <input
                        type='radio'
                        name='weather'
                        id='stormy'
                        onChange={({ target }) => setWeather(target.id)}
                    />
                    windy{' '}
                    <input
                        type='radio'
                        name='weather'
                        id='windy'
                        onChange={({ target }) => setWeather(target.id)}
                    />
                </div>

                <div>
                    comment
                    <input
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                    />
                </div>
                <button type='submit'>add</button>
            </form>
            <h2> Diary entries </h2>
            {diaries.map((diary) => (
                <div key={diary.id}>
                    <h3> {diary.date} </h3>
                    <p>
                        visibility: {diary.visibility} <br />
                        weather: {diary.weather}
                    </p>
                </div>
            ))}
        </>
    );
};

export default App;
