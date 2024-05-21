import { json } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { AddProduct } from "./types.server";
import { sendJSON } from "./category.server";

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });
    return products;
  } catch (error) {
    console.error(error);
    return sendJSON({ message: "Something went wrong", status: 500 });
  }
};

export const createProduct = async (product: AddProduct) => {
  try {
    //check if product with that name already exists
    const exists = await prisma.product.count({
      where: { name: product.name },
    });
    if (exists)
      return sendJSON({ message: "Product name already exists",status: 400 });

    // Get the categories that the product belongs to
    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: product.categories,
        },
      },
    });

    // Create the product with the retrieved categories
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        categories: {
          connect: categories.map((category) => ({ id: category.id })),
        },
        imageUrl: product.imgSrc,
      },
    });

    if (!createdProduct)
      return sendJSON({ message: "Failed to create product",status: 500 });

    return sendJSON({ message: "Product created successfully",status: 200 });
  } catch (error) {
    console.error(error);
    return sendJSON({ message: "Something went wrong" ,status: 500});
  }
};
