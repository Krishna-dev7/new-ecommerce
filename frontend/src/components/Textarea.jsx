import { forwardRef , useId } from "react";
function Textarea({
  className='',
  name,
  label,
  placeholder,
  error,
  ...props
}, ref){
  const id = useId();

  return <>
    <div className="w-full mb-5 text-lg px-5 py-3" >
      { label && <label
        className="block text-lg mb-3 text-black"
        htmlFor={id}>
        {label}
      </label> }

      <textarea
        id={id}
        className={` px-3 py-1 shadow-xm w-full text-black rounded-md outline-none ${className}`}
        name={name}
        placeholder={placeholder}
        ref={ref} 
        {...props} ></textarea>

      { error && <p className="text-red-600 mt-3 font-bold text-md" >
          { error }
        </p> }
    </div>
  </>
}
export default  forwardRef(Textarea);
