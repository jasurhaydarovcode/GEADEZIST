// types/category.ts
export interface Category {
  body: {
    id: string;
    name: string;
    description: string;
    fileId?: string;
    questionCount: number;
    extraQuestionCount: number;
    durationTime: number;
    retakeDate: string;
    createdBy: string;
    deleted: boolean;
    deletedBy?: string;
  }
}
