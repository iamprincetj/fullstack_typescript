import { InputLabel, TextField } from '@mui/material';

interface Props {
    dischargeDate: string;
    setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
    dischargeCriteria: string;
    setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const DisplayHospitalForm = ({
    dischargeDate,
    dischargeCriteria,
    setDischargeCriteria,
    setDischargeDate,
}: Props) => {
    return (
        <div>
            <InputLabel style={{ marginTop: 15 }}> Discharge </InputLabel>
            <TextField
                type='date'
                style={{ marginRight: 10 }}
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
                type='text'
                label='Criteria'
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
            />
        </div>
    );
};

export default DisplayHospitalForm;
