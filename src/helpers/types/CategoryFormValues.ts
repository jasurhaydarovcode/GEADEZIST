// helpers/types/CategoryFormValues.ts
export interface CategoryFormValues {
    categoryName: string;
    categoryType: 'asosiy' | 'asosiy-bolmagan';
    description: string;
    totalQuestions: number;
    additionalQuestions: number;
    duration: number;
    retryDate?: number; // Optional, as it might not be applicable for all categories
  }
  