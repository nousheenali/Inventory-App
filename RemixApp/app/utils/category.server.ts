import { json } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { AddCategory, CategoryType } from "./types.server";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { send } from "vite";

export const sendJSON = (data: any) => {
  return json(data);
};

export const getCategoryByName = async (
  name: string
): Promise<CategoryType | null> => {
  try {
    const category = await prisma.category.findUnique({
      where: { name: name },
    });
    return category;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createCategory = async (category: AddCategory) => {
  try {
    //check if category with that name already exists
    const exists = await prisma.category.count({
      where: { name: category.name },
    });
    if (exists) return sendJSON({ message: "Category already exists" ,status: 400});

    // Get the parent category if it exists
    const parent = category.parentCategory
      ? await getCategoryByName(category.parentCategory)
      : null;

    // Create the category with the parent category if it exists
    const newCategory = parent
      ? await prisma.category.create({
          data: {
            name: category.name,
            parentCategory: {
              connect: {
                id: parent?.id,
              },
            },
          },
        })
      : await prisma.category.create({
          data: {
            name: category.name,
          },
        });

    if (!newCategory)
      return sendJSON({ message: "Failed to create category", status: 500 });

    return sendJSON({ message: "Category created successfully", status: 200 });
  } catch (error) {
    console.error(error);
    return sendJSON({ message: "Something went wrong", status: 500 });
  }
};

export const getAllCategories = async () => {
  try {
    const productsWithCategories = await prisma.category.findMany({
      include: { parentCategory: true },
    });
    return productsWithCategories;
  } catch (error) {
    console.error(error);
    return sendJSON({ message: "Something went wrong", status: 500 });
  }
};
