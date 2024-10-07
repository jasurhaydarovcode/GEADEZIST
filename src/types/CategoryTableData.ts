export interface CategoryTableData {
    id: string; // Yoki raqam
    image: string;
    categoryType: 'asosiy' | 'asosiy-bolmagan'; // Yoki boshqa qiymat
    name: string;
    description: string;
    totalQuestions: number; // Yoki string
    additionalQuestions: number; // Yoki string
    duration: number; // Yoki string
    reAdmissionDate: string; // ISO formatida
    createdBy: string;
    situation: string; // Ixtiyoriy
    deletedBy: string; // Ixtiyoriy
}
