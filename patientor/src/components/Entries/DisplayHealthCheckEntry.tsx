import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Diagnosis, HealthCheckEntry } from '../../types';

interface Props {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[] | undefined;
    diagnosesName: (code: string) => string | undefined;
}

const DisplayHealthCheckEntry = ({
    entry,
    diagnoses,
    diagnosesName,
}: Props) => {
    const favoriteColor = (rating: number) => {
        switch (rating) {
            case 0:
                return 'green';
            case 1:
                return 'yellow';
            case 2:
                return 'orange';
            case 3:
                return 'red';
            default:
                return 'black';
        }
    };
    return (
        <div className='entries-container'>
            <p>
                {' '}
                {entry.date} <MedicalServicesIcon />{' '}
            </p>
            <p>{entry.description}</p>
            {entry.diagnosisCodes && (
                <div>
                    <h4>diagnosis codes</h4>
                    <p>
                        {diagnoses &&
                            entry.diagnosisCodes?.map((code, idx) => (
                                <i key={idx}>
                                    {' '}
                                    {code}: {diagnosesName(code)} <br />
                                </i>
                            ))}
                    </p>
                </div>
            )}
            <FavoriteIcon
                style={{
                    color: favoriteColor(entry.healthCheckRating),
                }}
            />
            <p>diagnosed by {entry.specialist}</p>
        </div>
    );
};

export default DisplayHealthCheckEntry;
