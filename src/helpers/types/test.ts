// types.ts

// Type for the options of a question
export type OptionDto = {
  id: number;
  answer: string;
  questionId: number;
  isCorrect: boolean;
  file: string | null;
};

// Type for a question
export type Question = {
  id: number;
  name: string;
  categoryName: string | null;
  categoryId: number | null;
  finiteError: number;
  type: string;
  difficulty: string;
  attachmentIds: number[] | null;
  optionDtos: OptionDto[];
  createdByName: string;
};

// Type for the body of the API response
export type BodyResponse = {
  page: number;
  size: number;
  totalPage: number;
  totalElements: number;
  body: Question[];
};

// Type for the full API response
export type ApiResponse = {
  message: string;
  success: boolean;
  status: string;
  body: BodyResponse;
};

interface OptDtos   {
  "id": number
  "answer": string
  "questionId": number
  "isCorrect": boolean
  "file": null | number
}
// Type for the mapped test data used in your application
export type FetchedTest = {
  "id": number
  "name": string
  "categoryName":string
  "categoryId": number
  "finiteError": number
  "type": string
  "difficulty": string
  "attachmentIds": null | number
  "optionDtos": [
    OptDtos
  ],
  "createdByName": string
}
// EditModal propslari uchun interfeys
 export interface FilteredTest {
  "id": number
  "name": string
  "categoryName":string | null
  "categoryId": number | null 
  "finiteError": number
  "type": string
  "difficulty": string
  "attachmentIds": number[] | null 
  "optionDtos": [
    OptDtos
  ],
  "createdByName": string
  key: number
  numer: number
  testRasm: string
  savol: string
  catygoria: string
  savolTuri: string
  qiyinligi: string
  yaratganOdam: string
}