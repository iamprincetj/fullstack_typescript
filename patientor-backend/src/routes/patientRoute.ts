import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, { toNewEntry } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
    res.send(patientService.getNoSnn());
});

patientRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.findById(id);

    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json({
            error: 'No sure user',
        });
    }
});

patientRouter.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatients(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }

        res.status(400).send(errorMessage);
    }
});

patientRouter.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const newEntry = toNewEntry(req.body);
        const returnedEntry = patientService.addEntries(newEntry, id);
        res.json(returnedEntry);
    } catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }

        res.status(400).send(errorMessage);
    }
});

export default patientRouter;
