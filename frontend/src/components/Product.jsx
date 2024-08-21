function Product({children, className=''}) {

  const style = " bg-[#ebd3f8] p-5 border-none "
  return <>
    <div className={ `${style} ${className}` }  >
      { children }
    </div>
  </>
}

export default Product;