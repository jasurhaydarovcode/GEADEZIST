// types/CategoryFormValues.ts
export interface CategoryFormValues {
    categoryType: 'asosiy' | 'asosiy-bolmagan'; // Kategoriya turini belgilash
    categoryName: string; // Kategoriya nomi
    description: string; // Kategoriya tavsifi
    totalQuestions: string; // Umumiy savollar
    additionalQuestions: string; // Qo'shimcha savollar
    duration: string; // Davomiylik vaqti
}