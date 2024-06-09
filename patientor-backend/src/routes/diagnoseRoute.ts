import express from 'express';
import diagonoseService from '../services/diagnoseService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
    res.send(diagonoseService.getDiagonoses());
});

diagnoseRouter.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default diagnoseRouter;
