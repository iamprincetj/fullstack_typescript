import { InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
    healthCheckRating: string;
    setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
}

const DisplayHealthCheckForm = ({
    healthCheckRating,
    setHealthCheckRating,
}: Props) => {
    const types = ['0', '1', '2', '3'];
    return (
        <div>
            <InputLabel style={{ marginTop: 10 }} id='type'>
                Health check
            </InputLabel>
            <Select
                fullWidth
                label='Type'
                labelId='type'
                value={healthCheckRating}
                onChange={(e) => setHealthCheckRating(e.target.value as string)}
                style={{ marginBottom: 10 }}
            >
                {types.map((type, idx) => (
                    <MenuItem key={idx} value={type}>
                        {' '}
                        {type && type}{' '}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default DisplayHealthCheckForm;
