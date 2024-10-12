export interface CategoryModalTypes {
    name: string;
    description?: string;
}

export interface CategoryAddModalProps {
    onAddCategory: (newCategory: CategoryModalTypes) => void;
}