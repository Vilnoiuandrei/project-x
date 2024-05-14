interface ButtonProps {
  children: string;
  onClick?: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      type="submit"
      className="buttonEfect mb-4 mt-5  h-12 w-80   rounded-xl bg-red-600 text-2xl hover:text-gray-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
