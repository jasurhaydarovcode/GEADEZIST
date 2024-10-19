interface dtos {
    "id": number,
    "answer": string,
    "questionId": number,
    "isCorrect": boolean,
    "file": boolean
}

export interface ClientQuizType {
    "id": number,
    "name": string,
    "categoryName": string,
    "duration": number,
    "categoryId": number,
    "finiteError": number,
    "type": string,
    "difficulty": string,
    "attachmentIds": boolean,
    "optionDtos": dtos[],
    "createdByName": string
}