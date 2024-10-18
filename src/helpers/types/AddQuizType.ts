interface optionDrop {
    "answer": string
    "isCorrect": boolean
    "file": number
}
export interface AddQuizType {
    "name": string
    "categoryId": number
    "finiteError": number
    "type": string
    "difficulty": string
    "attachmentIds": number[]
    "optionDtos": optionDrop[]
}

export interface Answer {
    id: number;
    value: string;
    checked?: boolean; // Optional, for multiple-choice scenarios
  }
  