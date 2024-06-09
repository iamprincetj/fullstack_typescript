import { Diagnosis, OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[] | undefined;
    diagnosesName: (code: string) => string | undefined;
}

const DisplayOccupationalHealthcareEntry = ({
    entry,
    diagnoses,
    diagnosesName,
}: Props) => {
    return (
        <div className='entries-container'>
            <p>
                {entry.date} <WorkIcon /> <span>{entry.employerName}</span>
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
            {entry.sickLeave && (
                <div>
                    <h4>sick leave:</h4>
                    <span>start date: {entry.sickLeave?.startDate}</span> <br />
                    <span>end date: {entry.sickLeave?.endDate}</span>
                </div>
            )}
            <p>diagnosed by {entry.specialist}</p>
        </div>
    );
};

export default DisplayOccupationalHealthcareEntry;
