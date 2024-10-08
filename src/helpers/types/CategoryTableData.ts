export interface CategoryTableData {
    id: string;
    image: string;
    categoryType: string; // Yoki boshqa qiymat
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
