function Button({
  type='button',
  className,
  children,
}) {

  return <button
    className={ ` px-4 py-2 bg-orange-600 text-black rounded-md border shadow-md ${className}` } type={type} >
    {children}
  </button>
}

export default Button;