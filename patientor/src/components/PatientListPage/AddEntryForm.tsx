import {
    Button,
    Checkbox,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { Diagnosis, Entry, Type } from '../../types';
import { useEffect, useState } from 'react';
import entries from '../../services/entries';
import { AxiosError } from 'axios';
import patientService from '../../services/patients';
import DisplayHealthCheckForm from '../Entries/DisplayHealthCheckForm';
import DisplayHospitalForm from '../Entries/DisplayHospitalForm';
import DisplayOccupationalForm from '../Entries/DisplayOccupationalForm';

interface Prop {
    id: string;
    setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
    setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const AddEntryForm = ({ id, setEntries, setNotification }: Prop) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [codes, setCodes] = useState<Array<Diagnosis['code']>>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [employerName, setEmployerName] = useState('');

    useEffect(() => {
        patientService.getDiagnoses().then((res) => {
            const codes = res.map((c: Diagnosis) => c.code);
            setCodes(codes);
        });
        setTypes(Object.values(Type));
    }, []);

    const clearForm = () => {
        setDate('');
        setDescription('');
        setSpecialist('');
        setHealthCheckRating('');
        setSelectedType('');
        setDischargeCriteria('');
        setDischargeDate('');
        setEmployerName('');
        setEndDate('');
        setStartDate('');
        setDiagnosisCodes([]);
    };

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const data = {
            date,
            description,
            specialist,
            diagnosisCodes,
            type: selectedType,
            healthCheckRating: Number(healthCheckRating),
            employerName,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria,
            },
            sickLeave: {
                startDate,
                endDate,
            },
        };

        try {
            const request = await entries.createPatientEntry(id, data);
            setEntries((prev) => [...prev, request]);
            clearForm();
        } catch (error) {
            if (error instanceof AxiosError) {
                setNotification(error.response?.data);
                setTimeout(() => setNotification(''), 5000);
            }
        }
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleChange = (event: SelectChangeEvent<typeof codes>) => {
        {
            const {
                target: { value },
            } = event;
            setDiagnosisCodes(
                typeof value === 'string' ? value.split(',') : value
            );
        }
    };

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();

        if (typeof event.target.value === 'string') {
            const value = event.target.value;
            const type = Object.values(Type).find(
                (t) => t.toString() === value
            );
            if (type) {
                setSelectedType(type);
            }
        }
    };

    const typeFormToShow = () => {
        switch (selectedType) {
            case 'OccupationalHealthcare':
                return (
                    <DisplayOccupationalForm
                        employerName={employerName}
                        setEmployerName={setEmployerName}
                        endDate={endDate}
                        startDate={startDate}
                        setEndDate={setEndDate}
                        setStartDate={setStartDate}
                    />
                );
            case 'HealthCheck':
                return (
                    <DisplayHealthCheckForm
                        healthCheckRating={healthCheckRating}
                        setHealthCheckRating={setHealthCheckRating}
                    />
                );
            case 'Hospital':
                return (
                    <DisplayHospitalForm
                        dischargeDate={dischargeDate}
                        dischargeCriteria={dischargeCriteria}
                        setDischargeCriteria={setDischargeCriteria}
                        setDischargeDate={setDischargeDate}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h4> New HealthCheck entry </h4>
            <form onSubmit={handleSubmit} style={{ marginBottom: 10 }}>
                <TextField
                    type='text'
                    label='Description'
                    value={description}
                    fullWidth
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    type='date'
                    value={date}
                    placeholder='YYYY-MM-DD'
                    fullWidth
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    type='text'
                    label='Specialist'
                    value={specialist}
                    fullWidth
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <InputLabel style={{ marginTop: 10 }} id='diagnosis-code'>
                    Diagnosis Code
                </InputLabel>
                <Select
                    labelId='diagnosis-code'
                    multiple
                    fullWidth
                    value={diagnosisCodes}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {codes.map((code, idx) => (
                        <MenuItem key={idx} value={code}>
                            <Checkbox
                                checked={diagnosisCodes.indexOf(code) > -1}
                            />
                            <ListItemText primary={code} />
                        </MenuItem>
                    ))}
                </Select>
                <InputLabel style={{ marginTop: 10 }} id='type'>
                    Type
                </InputLabel>
                <Select
                    fullWidth
                    label='Type'
                    labelId='type'
                    value={selectedType}
                    onChange={handleTypeChange}
                    style={{ marginBottom: 10 }}
                >
                    {types.map((type, idx) => (
                        <MenuItem key={idx} value={type}>
                            {' '}
                            {type && type}{' '}
                        </MenuItem>
                    ))}
                </Select>

                {typeFormToShow()}

                <Grid>
                    <Grid item>
                        <Button
                            type='button'
                            color='error'
                            style={{ float: 'left' }}
                            variant='outlined'
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            type='submit'
                            color='primary'
                            style={{ float: 'right' }}
                            variant='outlined'
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddEntryForm;
