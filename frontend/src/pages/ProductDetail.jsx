import productService from "../app/productService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect( () => {
        productService.getProduct(id)
            .then( result => {
                setProduct(result);
            })
            .catch( err => {
                console.log(err.message);
            })
    }, [] )

    return <div>
        { product ?? product }
    </div>
}

export default ProductDetail;