export interface AnswerRes {
    "id": number
    "answer": string
    "questionId": number
    "isCorrect": boolean
    "file": null | number
}

export interface QuizType {
    "id": number
    "name": string
    "categoryName": string
    "categoryId": number
    "finiteError":number
    "type": string
    "difficulty": String
    "attachmentIds": null,
    "optionDtos": AnswerRes
    "createdByName": string
  }