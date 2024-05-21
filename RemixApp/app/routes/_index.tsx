import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ButtonField } from "../components/buttonField";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-white text-5xl font-bold">
        Welcome to Inventory Genie!
      </h1>
      <p className="text-white text-2xl font-bold p-6">
        Your one-stop shop for managing your inventory.
      </p>
      <div className="space-x-10">
        <ButtonField label="Add Product" onClick={() => navigate("/Product")} />
        <ButtonField
          label="Add Category"
          onClick={() => navigate("/Category")}
        />
        <ButtonField
          label="View Categories"
          onClick={() => navigate("/ListCategories")}
        />
        <ButtonField
          label="View Products"
          onClick={() => navigate("/ListProducts")}
        />
      </div>
    </div>
  );
}
