// testvisual.ts faylida
export interface OptionDto {
    id: number;
    answer: string;
    questionId: number;
    isCorrect: boolean;
    file: string | null;
    
}

export interface QuizType {
    id: number;
    name: string;
    categoryName: string | null;
    categoryId: number | null;
    finiteError: number;
    type: "SUM" | "ONE_CHOICE" | "ANY_CORRECT";
    difficulty: string;
    attachmentIds: string[] | null;
    optionDtos: OptionDto[];
    createdByName: string;
}


export interface BodyRespon {
    message: string;
    success: boolean;
    status: string;
    body: {
        page: number;
        size: number;
        totalPage: number;
        totalElements: number;
        body: QuizType[];
    };
}


// AnswerType.ts faylida
export type AnswerRes = OptionDto;
