import { json } from "@remix-run/node";
import {prisma} from "./prisma.server";
import { AddProduct } from "./types.server";

export const createProduct = async (product: AddProduct) => {

    try {

        //check if product with that name already exists
        const exists = await prisma.product.count({where: {name: product.name}});
        if (exists) {
            return json({ message: "Product with that name already exists" }, { status: 400 });
        }

        //create product
        const newUser = await prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image
            }
        });
        return json({ message: "Product created successfully" });
    }
    catch (error) {
        console.error(error);
    }
}
