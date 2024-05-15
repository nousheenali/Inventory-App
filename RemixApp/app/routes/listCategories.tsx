import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllCategories } from "~/utils/category.server";
import { CategoryType } from "~/utils/types.server";

export const loader: LoaderFunction = async () => {
  try {
    return getAllCategories();
  } catch (error) {
    console.error(error);
  }
};

export default function ListCategories() {

  let categories = useLoaderData<CategoryType[]>();

  return (
    <div className="flex justify-center items-center flex-col gap-y-4">
      <h1 className="text-blue-500 text-5xl font-bold underline p-6">
        Categories List
      </h1>
      <table className="table-auto border-collapse border border-blue-500">
        <thead>
          <tr>
            <th className="border border-blue-500 px-4 py-2">Category Name</th>
            <th className="border border-blue-500 px-4 py-2">Parent Category</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.name}>
              <td className="border border-blue-500 px-4 py-2">{category.name}</td>
              <td className="border border-blue-500 px-4 py-2">{category.parentCategory?.name}</td>
              {/* Add more table cells for other category properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
