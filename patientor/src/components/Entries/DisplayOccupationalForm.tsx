import { InputLabel, TextField } from '@mui/material';

interface Props {
    employerName: string;
    setEmployerName: React.Dispatch<React.SetStateAction<string>>;
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const DisplayOccupationalForm = ({
    employerName,
    setEmployerName,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
}: Props) => {
    return (
        <div>
            <TextField
                type='text'
                label='Employer Name'
                value={employerName}
                fullWidth
                onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel style={{ marginTop: 10 }}>
                Sick Leave Start Date
            </InputLabel>
            <TextField
                type='date'
                value={startDate}
                fullWidth
                onChange={({ target }) => setStartDate(target.value)}
            />
            <InputLabel style={{ marginTop: 10 }}>
                Sick Leave End Date
            </InputLabel>
            <TextField
                type='date'
                value={endDate}
                fullWidth
                onChange={({ target }) => setEndDate(target.value)}
            />
        </div>
    );
};

export default DisplayOccupationalForm;
