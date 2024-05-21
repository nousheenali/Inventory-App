interface ImageFileInputProps {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}


export function ImageFileInput(data: ImageFileInputProps) {
    return (
        <label>
            {data.label}
            <input
                type="file"
                id={data.name}
                name={data.name}
                accept="image/*"
                onChange={data.onChange}
                className="w-full p-2 mt-2 rounded-xl"
            />
        </label>
    );
}
