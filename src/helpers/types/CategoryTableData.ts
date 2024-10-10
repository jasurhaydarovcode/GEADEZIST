// helpers/types/CategoryTableData.ts
export interface CategoryTableData {
    id: string;
    image: string; // yoki boshqa kerakli tur
    categoryType: 'asosiy' | 'asosiy-bolmagan';
    name: string;
    description: string;
    totalQuestions: number;
    additionalQuestions: number;
    duration: number;
    reAdmissionDate: string; // ISO formatdagi sana
    createdBy: string;
    situation: string;
    deletedBy: string;
  }
  