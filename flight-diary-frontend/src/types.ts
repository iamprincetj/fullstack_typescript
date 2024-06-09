export interface DiaryBase {
    id: number;
    date: string;
    weather: string;
    visibility: string;
}

export interface DiaryComment extends DiaryBase {
    comment: string;
}

export type NewDiary = Omit<DiaryComment, 'id'>;
