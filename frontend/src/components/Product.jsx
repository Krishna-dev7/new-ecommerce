function Product({children, onClick=() => null,  className=''}) {

  const style = " bg-[#ebd3f8] p-5 border-none "
  return <>
    <div
      onClick={onClick}
       className={ `${style} ${className}` }  >
      { children }
    </div>
  </>
}

export default Product;