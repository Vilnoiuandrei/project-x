interface ButtonProps {
  children: string;
  onClick?: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      type="submit"
      className="buttonEfect mb-4 mt-5  h-16 w-96  rounded-xl bg-red-700 text-2xl text-white hover:text-gray-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
