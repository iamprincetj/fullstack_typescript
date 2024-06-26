interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartDescription {
    kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: 'group';
}

interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: 'background';
}

interface CoursePartRequirement extends CoursePartDescription {
    requirements: string[];
    kind: 'special';
}

type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartRequirement;

const assertValue = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>;
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map((part) => (
                <Part key={part.name} coursePart={part} />
            ))}
        </div>
    );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.kind) {
        case 'basic':
            return (
                <div>
                    <h3>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h3>
                    {coursePart.description}
                </div>
            );
        case 'background':
            return (
                <div>
                    <h3>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h3>
                    <p> {coursePart.description} </p>
                    <p>{coursePart.backgroundMaterial} </p>
                </div>
            );
        case 'group':
            return (
                <div>
                    <h3>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h3>
                    project exercises {coursePart.groupProjectCount}
                </div>
            );
        case 'special':
            return (
                <div>
                    <h3>
                        {coursePart.name} {coursePart.exerciseCount}
                    </h3>
                    <p> {coursePart.description} </p>
                    required skills: {coursePart.requirements.join(', ')}
                </div>
            );
        default:
            return assertValue(coursePart);
    }
};

const Total = ({ totalExercises }: { totalExercises: number }) => {
    return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
    const courseName = 'Half Stack application development';

    const courseParts: CoursePart[] = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is an awesome course part',
            kind: 'basic',
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: 'group',
        },
        {
            name: 'Basics of type Narrowing',
            exerciseCount: 7,
            description: 'How to go from unknown to string',
            kind: 'basic',
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            backgroundMaterial:
                'https://type-level-typescript.com/template-literal-types',
            kind: 'background',
        },
        {
            name: 'TypeScript in frontend',
            exerciseCount: 10,
            description: 'a hard part',
            kind: 'basic',
        },
        {
            name: 'Backend development',
            exerciseCount: 21,
            description: 'Typing the backend',
            requirements: ['nodejs', 'jest'],
            kind: 'special',
        },
    ];

    const totalExercises = courseParts.reduce(
        (sum, part) => sum + part.exerciseCount,
        0
    );

    return (
        <div>
            <Header name={courseName} />
            <Content courseParts={courseParts} />
            <Total totalExercises={totalExercises} />
        </div>
    );
};

export default App;
