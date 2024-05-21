export interface AddProduct {
    name: string;
    description: string;
    price: number;
    categories: string[];
    imgSrc: string;
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
  // parentCategory: ParentCategory | null;
};

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: CategoryType[];
};
