interface FormFieldProps {
  label: string;
  type: "text" | "number";
  value: string | number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  step?: string;
}

export function InputField(data: FormFieldProps) {
  return (
    <label>
      {data.label}
      <input
        className="w-full p-2 rounded-xl my-2"
        id={data.name}
        type={data.type}
        value={data.value}
        name={data.name}
        onChange={data.onChange}
        required={data.required}
        step={data.step}
      />
    </label>
  );
}
