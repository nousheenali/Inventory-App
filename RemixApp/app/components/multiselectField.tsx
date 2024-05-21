export interface MultiSelectFieldProps {
  label: string;
  name: string;
  options: string[];
  selectedOptions: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  multiple: boolean;
  records: string[];
}

export function MultiSelectField(data: MultiSelectFieldProps) {
  return (
    <label>
      {data.label}
      <select
        className="w-full p-2 rounded-xl my-2"
        id={data.name}
        name={data.name}
        onChange={data.onChange}
        multiple={data.multiple}
        value={data.selectedOptions}
      >
        {data.records.map((record) => (
          <option
            key={record}
            value={record}
          >
            {record}
          </option>
        ))}
      </select>
    </label>
  );
}
