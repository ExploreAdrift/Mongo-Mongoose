import React, {useState, useEffect} from "react";
import axios from "axios"
import { Link } from "react-router-dom";


const AllProducts = (props) => {

    let [products, setProducts] = useState([])
    let [productDeleted, setProductDeleted] = useState(false)


    useEffect(() => {
    axios.get("http://localhost:8000/api/managers")
        .then((response) => {
            console.log("response: ",response);
            setProducts(response.data.results);
        })
        .catch(err => console.log(err))
}, [productDeleted, props.formSubmitted])

    const deleteProduct = (id) =>{
            axios.delete(`http://localhost:8000/api/managers/${id}`)
            .then(response => {
                setProductDeleted(!productDeleted)
                // WILL DELETE FROM DB AND UPDATE STATE VARIABLE AND SET IT TO OPPOSITE,
                // WITH productDELETED IN LINE 19, BEING UPDATED, IT WLL CAUSE IT TO RUN AGAIN.
            })
            .catch(err => console.log(err))
        }




    return (
        <div >
            <h3>ALL PRODUCTS</h3>
            {
                products.map((product) => {
                    return(
                        <div className="card container" key={product._id}>
                            {/* LINK TO DETAILS PAGE */}
                            <h2><Link to={`/products/${product._id}`}>{product.title}</Link></h2>

                            {/* LINK TO EDIT ON ALL PAGE, NEED BACKTICS AND $ FOR STRING INTERPOLATION/MONEYHUGS */}
                            <Link to = {`/products/edit/${product._id}`}className="btn btn-warning mt-3">EDIT {product.name}</Link>
                            {/* THE ID FROM DELETE PRODUCT(LINE 20) IS BEING PASSED IN ON LINE 44 */}
                            <button onClick={() => deleteProduct(product._id)} className="btn btn-danger mt-3">DELETE {product.title}</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AllProducts;