import { useMatch } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnosis, Entry, Patient } from '../../types';
import React, { useEffect, useState } from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import './patient.css';
import { Alert, InputLabel } from '@mui/material';
import DisplayHealthCheckEntry from '../Entries/DisplayHealthCheckEntry';
import DisplayHospitalEntry from '../Entries/DisplayHospitalEntry';
import DisplayOccupationalHealthcareEntry from '../Entries/DisplayOccupationalHealthcareEntry';
import AddEntryForm from './AddEntryForm';

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const [id, setId] = useState('');
    const [entries, setEntries] = useState<Entry[]>([]);
    const patientMatch = useMatch('/patients/:id');
    const [notification, setNotification] = useState('');
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

    useEffect(() => {
        if (patientMatch?.params.id) {
            patientService.getPatient(patientMatch.params.id).then((res) => {
                setPatient(res);
                setEntries(res.entries);
            });
            setId(patientMatch.params.id);
            patientService.getDiagnoses().then((res) => setDiagnoses(res));
        }
    }, []);

    const assertValue = (value: never): never => {
        throw new Error('value is not given: ' + value);
    };

    const diagnosesName = (code: string) => {
        return diagnoses?.find((d) => d.code === code)?.name;
    };

    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case 'HealthCheck':
                return (
                    <DisplayHealthCheckEntry
                        entry={entry}
                        diagnoses={diagnoses}
                        diagnosesName={diagnosesName}
                    />
                );
            case 'Hospital':
                return (
                    <DisplayHospitalEntry
                        entry={entry}
                        diagnosesName={diagnosesName}
                        diagnoses={diagnoses}
                    />
                );
            case 'OccupationalHealthcare':
                return (
                    <DisplayOccupationalHealthcareEntry
                        diagnoses={diagnoses}
                        diagnosesName={diagnosesName}
                        entry={entry}
                    />
                );
            default:
                return assertValue(entry);
        }
    };

    return (
        <div>
            <h2>
                {' '}
                {patient?.name}{' '}
                {patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}{' '}
            </h2>
            <p>ssn: {patient?.ssn} </p>
            <p> occupation {patient?.occupation} </p>
            {notification && <Alert severity='error'> {notification} </Alert>}
            <h3>Add new</h3>
            <InputLabel id='demo-multiple-checkbox-label'>
                Entry type
            </InputLabel>
            <AddEntryForm
                id={id}
                setEntries={setEntries}
                setNotification={setNotification}
            />
            <div style={{ marginTop: '5rem' }}>
                <h2> entries </h2>
                {entries.map((entry) => (
                    <div key={entry.id}>
                        <EntryDetails entry={entry} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientPage;
