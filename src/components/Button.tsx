interface ButtonProps {
  children: string;
  onClick?: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      type="submit"
      className="buttonEfect mb-4 mt-5 h-10 w-64 rounded-xl bg-red-600  text-lg hover:text-gray-300 md:h-12 md:w-80 md:text-2xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
