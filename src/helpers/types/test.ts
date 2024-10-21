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

// Type for the mapped test data used in your application
export type FetchedTest = {
  key: string; // Unique identifier for the test
  numer: number; // Serial number or index
  testRasm: string; // Placeholder for the image (string or URL)
  savol: string; // Question text
  catygoria: string; // Category name (or "No category")
  savolTuri: string; // Type of question
  qiyinligi: string; // Difficulty level
  yaratganOdam: string; // Creator's name
};
