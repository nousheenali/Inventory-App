interface ButtonFieldProps {
    label: string;
    onClick: () => void;
    }

export function ButtonField(data: ButtonFieldProps) {
    return (
      <button
        className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-4 w-96px"
        onClick={data.onClick}
      >
        {data.label}
      </button>
    );
}