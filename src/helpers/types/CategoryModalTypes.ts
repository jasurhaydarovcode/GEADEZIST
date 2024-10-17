export interface CategoryModalTypes {
  name: string;
  description?: string;
  id: number;
}

export interface CategoryAddModalProps {
  onAddCategory: (newCategory: CategoryModalTypes) => void;
  onCancel: () => void;
}
