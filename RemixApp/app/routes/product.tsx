import { InputField } from "~/components/inputField";
import { TextAreaField } from "~/components/textAreaField";
import { useState } from "react";
import { useActionData, useLoaderData } from "@remix-run/react";
import { validateProduct } from "~/validators.server";
import { getAllCategories } from "~/utils/category.server";
import { CategoryType } from "~/utils/types.server";
import { MultiSelectField } from "~/components/multiselectField";
import { createProduct } from "~/utils/product.server";
import { uploadImage } from "~/utils/cloudinary.server";
import { ImageFileInput } from "~/components/imagefileInput";
import {
  ActionFunction,
  LoaderFunction,
  UploadHandler,
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";


export const action: ActionFunction = async ({ request }) => {
  try {
    const uploadHandler: UploadHandler = composeUploadHandlers(
      async ({ name, data }) => {
        if (name !== "img") 
          return undefined;

        const uploadedImage: any = await uploadImage(data);
        return uploadedImage.secure_url;
      },
      createMemoryUploadHandler()
    );

    try {
      const form = await parseMultipartFormData(request, uploadHandler);
      const name = String(form.get("name"));
      const description = String(form.get("description"));
      const price = parseFloat(String(form.get("price")));
      const imgSrc = String(form.get("img"));

      const categories = form
        .getAll("selectedCategories")
        .toString()
        .split(",");

      //validate the form data
      const errors = {
        name: validateProduct(name, price, description),
      };

      if (Object.values(errors).some(Boolean)) {
        return json({ message: errors.name }, { status: 400 });
      }

      return createProduct({name, description, price, categories, imgSrc})

    } catch (err) {
      return json({ message: "Make sure all mandatory fields* are uploaded", status: 500 });
    }

  } catch (error) {
    console.error(error);
    return json({ message: "Something went wrong", status: 500 });
  }
};

export const loader: LoaderFunction = async () => {
  try {
    return getAllCategories();
  } catch (error) {
    console.error(error);
  }
};

export default function Product() {
  let categories = useLoaderData<CategoryType[]>();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    selectedCategories: [] as string[],
    img: null as File | null,
  });
  const actionData = useActionData<typeof action>();


  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    field: string
  ) => {
    if (field === "selectedCategories") {
      const selectedOptions = Array.from(
        (e.target as HTMLSelectElement).selectedOptions,
        (option) => option.value
      );
      setFormData((form) => ({
        ...form,
        [field]: selectedOptions.length ? selectedOptions : [],
      }));
    } else {
      setFormData((form) => ({
        ...form,
        [field]: e.target.value,
      }));
    }
    // console.log(formData.selectedCategories);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((form) => ({
        ...form,
        img: file,
      }));
    }
  };

  return (
    <div className="flex justify-center items-center flex-col gay-y-4">
      <h1 className="text-blue-500 text-5xl font-bold underline p-6">
        Add Product
      </h1>
      <form
        method="post"
        className="rounded-2xl bg-gray-200 p-6 w-1/3"
        encType="multipart/form-data"
      >
        <div
          className={
            actionData && actionData.message
              ? actionData.status === 200
                ? "text-green-500 font-bold text-center"
                : "text-red-500 font-bold text-center"
              : ""
          }
        >
          {actionData ? actionData.message : ""}
        </div>
        <InputField
          label="Product Name* :"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange(e, "name")}
          required
        />
        <TextAreaField
          label="Product Description :"
          name="description"
          value={formData.description}
          maxLength={100}
          onChange={(e) => handleInputChange(e, "description")}
        />
        <InputField
          label="Price :"
          type="number"
          name="price"
          value={formData.price}
          onChange={(e) => handleInputChange(e, "price")}
        />
        <MultiSelectField
          label="Select Categories :"
          name="selectedCategories"
          options={categories.map((category) => category.name)}
          selectedOptions={formData.selectedCategories}
          onChange={(e) => handleInputChange(e, "selectedCategories")}
          multiple
          records={categories.map((category) => category.name)}
        />
        <ImageFileInput
          label="Product Image* :"
          name="img"
          onChange={(e) => handleInputChange(e, "img")}
        />
        <p className="text-">* indicates mandatory fields</p>
        <div className="w-full text-center">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4 w-1/2">
            ADD PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
}
