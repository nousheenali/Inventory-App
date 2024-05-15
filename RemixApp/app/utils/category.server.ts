import { json } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { AddCategory } from "./types.server";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { send } from "vite";

export const sendJSON = (data: any, status: number) => {
  return json(data, { status });
};

export const getCategoryByName = async (name: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: { name: name },
    });

    return category;
  } catch (error) {
    console.error(error);
  }
};

export const createCategory = async (category: AddCategory) => {
  try {
    //check if product with that name already exists
    const exists = await prisma.category.count({
      where: { name: category.name },
    });
    if (exists) return sendJSON({ message: "Category already exists" }, 400);

    let parent = null;
    if (category.parentCategory !== null)
      parent = await getCategoryByName(category.parentCategory);

    const newCategory = await prisma.category.create({
      data: {
        name: category.name,
        parentCategory: {
          connect: {
            id: parent?.id,
          },
        },
      },
    });

    if (!newCategory)
      return sendJSON({ message: "Failed to create category" }, 500);

    return sendJSON({ message: "Category created successfully" }, 200);
  } catch (error) {
    console.error(error);
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
  }
};
