import { TextField } from '@mui/material';

interface Props {
    healthCheckRating: string;
    setHealthCheckRating: React.Dispatch<React.SetStateAction<string>>;
}

const DisplayHealthCheckForm = ({
    healthCheckRating,
    setHealthCheckRating,
}: Props) => {
    return (
        <div>
            <TextField
                type='text'
                label='Healthcheck rating'
                value={healthCheckRating}
                fullWidth
                onChange={({ target }) => setHealthCheckRating(target.value)}
            />
        </div>
    );
};

export default DisplayHealthCheckForm;
