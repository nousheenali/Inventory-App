
export const validateCategory = (category: string): string | undefined => {
  if (!category.length) {
    return "Category Name is required";
  }

  if (category.length > 10) {
    return "Category Name can not be more than 10 characters";
  }
}

export const validateProduct = (name: string, price: number, description: string): string| undefined => {

  if (typeof name !== "string" )
    return "Invalid name format";
   
  if (name.length > 20 || name.length < 3) 
    return "Name must be between 3 and 20 characters";

  if (typeof price !== "number" || isNaN(price))
    return "Please enter a valid Price";

  if (price < 0 || price > 1000000)
    return "Price must be between 0 and 1000000";

  if (description.length > 200)
    return "Description must be less than 200 characters";

}