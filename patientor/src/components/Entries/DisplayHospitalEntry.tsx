import { Diagnosis, HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
    entry: HospitalEntry;
    diagnoses: Diagnosis[] | undefined;
    diagnosesName: (code: string) => string | undefined;
}

const DisplayHospitalEntry = ({ entry, diagnoses, diagnosesName }: Props) => {
    return (
        <div className='entries-container'>
            <p>
                {entry.date} <LocalHospitalIcon />{' '}
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

            <p>discharged date: {entry.discharge.date}</p>
            <p>discharged criteria: {entry.discharge.criteria}</p>
            <p>diagnosed by {entry.specialist} </p>
        </div>
    );
};

export default DisplayHospitalEntry;
