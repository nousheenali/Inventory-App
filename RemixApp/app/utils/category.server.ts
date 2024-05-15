import { json } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { AddCategory } from "./types.server";

export const createCategory = async (category: AddCategory) => {
  try {
    //check if product with that name already exists
    const exists = await prisma.category.count({
      where: { name: category.name },
    });
    console.log(exists);
    if (exists) {
      return json(
        { message: "Category with that name already exists" },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        name: category.name,
      },
    });
    if (!newCategory) {
      return json(
        {
          message: "Something went wrong while creating the user",
          fields: { name: category.name },
        },
        { status: 400 }
      );
    }
    return json(
        {
          message: "Success!!",
          fields: { name: category.name },
        },);
  } catch (error) {
    console.error(error);
  }
};
