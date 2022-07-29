import React, {useState ,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";





const OneProduct = () =>
{

    // WERE EXPECTING JUST AN OBJECT BECAUSE ITS ONE PRODUCT, HENCE THE
    // MUSTACHE BRACKETS IN LINE 13
    const [details, setDetails] = useState({})
    const [notFound, setNotFound] = useState(false)
    const navigate = useNavigate();

    // THIS ID HAS TO MATCH ON APP.JS ROUTE PATH ROUTE FOR ONEPRODUCT
const {id} = useParams()
    // THAT ID IS BEING PASSED INTO ${ID} INTO LINE 20

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/managers/${id}`)
        .then(response =>{
            console.log(response)
            if(response.data.results){
            // WE GET RESPONSE.DATA.RESULTS FROM THE CONSOLE.LOG
            setDetails(response.data.results) 
            }else{
                // WE USE THIS JUST IN CASE THE PRODUCT ISNT FOUND
                setNotFound(true)
            }
        })
        .catch(err => console.log(err))
    },[])



    const deleteProduct = () =>{
        axios.delete(`http://localhost:8000/api/managers/${id}`)
        .then(response => {
            console.log(response)
            navigate("/")
        })
        .catch()
    }




    return (
        <div>
            {
                notFound === true?
                <p>CANNOT BE FOUND</p>:
                // NEED THE <> BELOW BECAUSE WE CAN ONLY USE ONE PARENT ELEMENT
                // THIS LETS US USE TWO
            <>
                <h3>{details.title}</h3>
                <h4>Price: {details.price}</h4>
                <h5>Description: {details.description}</h5>
                <button onClick={deleteProduct} className="btn btn-danger mt-3">DELETE {details.title} </button>
            </>
}
        </div>
    )
}

export default OneProduct;