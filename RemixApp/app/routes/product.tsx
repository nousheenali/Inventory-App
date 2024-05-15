import { InputField } from "~/components/inputField";
import { useState } from "react";

export default function Product() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
  });

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
        Add Product
      </h1>
      <form className="rounded-2xl bg-gray-200 p-6 w-96">
        <InputField
          label="Name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange(e, "name")}
        />
        <InputField
          label="Description"
          type="text"
          value={formData.description}
          onChange={(e) => handleInputChange(e, "description")}
        />
        <InputField
          label="Price"
          type="number"
          value={formData.price.toString()}
          onChange={(e) => handleInputChange(e, "price")}
        />
        <InputField
          label="Image URL"
          type="text"
          value={formData.image}
          onChange={(e) => handleInputChange(e, "imageUrl")}
        />
        <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4">
          Add Product
        </button>
      </form>
    </div>
  );
}
