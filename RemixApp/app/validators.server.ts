
export const validateCategory = (category: string): string | undefined => {
  if (!category.length) {
    return "Category Name is required";
  }

  if (category.length > 10) {
    return "Category Name can not be more than 10 characters";
  }
}