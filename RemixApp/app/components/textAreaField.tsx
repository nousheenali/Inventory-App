export interface TextAreaFieldProps {
    label: string;
    name: string;
    value: string;
    maxLength: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

}

export function TextAreaField(data: TextAreaFieldProps) {
    return (
        <label>
            {data.label}
            <textarea
                name={data.name}
                value={data.value}
                onChange={data.onChange}
                maxLength={data.maxLength}
                className="w-full p-2 mt-2 rounded-xl"
            />
        </label>
    );
}