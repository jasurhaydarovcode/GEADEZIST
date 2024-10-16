export interface CategoryFormValues {
  categoryType: string;
  name: string;
  description: string;
  questionCount?: number;
  extraQuestionCount?: number;
  durationTime?: number;
  retakeDate?: number;
}