interface InputProps {
  id: string;
  autoComplete: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  id,
  autoComplete,
  placeholder,
  type,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      id={id}
      autoComplete={autoComplete}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className="mb-6 h-10 w-64 rounded-md border-2 border-gray-300 md:h-12 md:w-80"
    />
  );
}
export default Input;
