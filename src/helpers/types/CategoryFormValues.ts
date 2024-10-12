export interface CategoryFormValues {
  categoryName: string;
  categoryType: 'asosiy' | 'asosiy-bolmagan';
  description: string;
  totalQuestions: number;
  additionalQuestions: number;
  duration: number;
  retryDate?: number;
}
