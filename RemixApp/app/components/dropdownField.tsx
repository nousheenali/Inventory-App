import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllCategories } from "~/utils/category.server";
import { CategoryType } from "~/utils/types.server";

export interface DropdownFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
  categories: CategoryType[];
}


export function DropdownField(data: DropdownFieldProps) {
  return (
    <label>
      {data.label}
      <select
        name={data.name}
        value={data.value}
        onChange={data.onChange}
        id={data.id}
        className="w-full p-2 mt-2"
      >
        <option value="">Select a category</option>
        {data.categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
}
