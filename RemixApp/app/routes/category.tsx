import { InputField } from "~/components/inputField";
import { useState } from "react";
import { ActionFunction, json } from "@remix-run/node";
import { validateCategory } from "~/validators.server";
import { createCategory } from "~/utils/category.server";
import { useActionData } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  try {
    const form = await request.formData();

    const name = form.get("categoryname");
    if (typeof name !== "string") {
      return json({ message: "Invalid name", form: action }, { status: 400 });
    }

    const errors = {
      name: validateCategory(name),
    };

    if (Object.values(errors).some(Boolean)) {
      return json({ message: "Invalid fields", errors }, { status: 400 });
    }
    return await createCategory({ name });
  } catch (error) {
    console.error(error);
    return json({ message: "Something went wrong" }, { status: 500 });
  }
};

export default function Category() {
//   const [act, setAct] = useState("submit"); // ['submit', 'success', 'error'
  const [formData, setFormData] = useState({
    categoryname: "",
  });
  const actionData = useActionData<typeof action>();


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center flex-col gay-y-4">
      <h1 className="text-blue-500 text-5xl font-bold underline p-6">
        Add Category
      </h1>
      <div>{actionData ? actionData.message : "Waiting..."}</div>
      <form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
        <InputField
          label="Category Name"
          type="text"
          name="categoryname"
          value={formData.categoryname}
          onChange={(e) => handleInputChange(e, "categoryname")}
        />

        <div className="w-full text-center">
          <button
            type="submit"
            name="_action"
            value="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4 w-1/2"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
}
