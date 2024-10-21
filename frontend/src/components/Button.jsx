function Button({
  type = 'button',
  className,
  children,
}) {
  return (
    <button
      className={`px-3 py-2 sm:px-0 md:px-0 md:py-3 bg-orange-600 text-black rounded-md border shadow-md text-sm md:text-base lg:text-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-opacity-50 transition duration-300 ease-in-out ${className}`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
