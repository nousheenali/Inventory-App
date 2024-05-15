export interface AddProduct {
    name: string;
    description: string;
    price: number;
    image: string;
}

export interface AddCategory {
  name: string;
  parentCategory: string | null;
}

export type ParentCategory = {
  id: number;
  name: string;
  parentId: number | null;
  ProductId: number | null;
};

// Define a type for a category
export type CategoryType = {
  id: number;
  name: string;
  parentId: number | null;
  ProductId: number | null;
  parentCategory: ParentCategory | null;
};