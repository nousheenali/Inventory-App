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
    <div className="flex justify-center items-center flex-col gay-y-4">
      <h1 className="text-blue-500 text-5xl font-bold underline p-6">
        Remix Product App
      </h1>
      <ButtonField
        label="ADD PRODUCT"
        onClick={() => navigate("/Product")}
      ></ButtonField>
      <ButtonField
        label="ADD CATEGORY"
        onClick={() => navigate("/Category")}
      ></ButtonField>
      <ButtonField
        label="VIEW CATEGORIES"
        onClick={() => navigate("/ListCategories")}
      ></ButtonField>
      <ButtonField
        label="VIEW PRODUCTS"
        onClick={() => navigate("/ListProducts")}
      ></ButtonField>
    </div>
  );
}
