interface optionDtos {
    "id": number,
    "answer": string,
    "questionId": number,
    "isCorrect": boolean,
    "file": number | null
}


export interface ClientQuizType {
    "id": number,
    "name": number | string,
    "categoryName": string,
    "categoryId": number,
    "finiteError": number,
    "type": string,
    "difficulty": string,
    "attachmentIds": number | null,
    "questionDtoList": [
        optionDtos
    ],
    "createdByName": string
}