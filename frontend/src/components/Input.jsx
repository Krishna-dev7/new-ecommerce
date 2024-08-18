import { forwardRef, useId } from "react"

function Input({
  label,
  className='',
  type='text',
  error='',
  placeholder='',
  ...props
}, ref) {

  const id = useId();

  return (
    <div className="w-full mb-5 text-lg px-5 py-3" >
      { label && <label
        className="block text-lg mb-3 text-zinc-100"
        htmlFor={id}>
        {label}
      </label> }

      <input
        type={type}
        id={id}
        className={`$className px-3 py-1 shadow-md w-full text-black rounded-sm  border-none`}
        placeholder={placeholder}
        ref={ref} 
        {...props} />

      { error && <p className="text-red-600 mt-3 font-bold text-md" >
          { error }
        </p> }
    </div>
  )
}

export default forwardRef(Input);