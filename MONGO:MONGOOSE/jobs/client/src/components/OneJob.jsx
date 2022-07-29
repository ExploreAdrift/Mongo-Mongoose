import React, {useState ,useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";






const OneJob = () =>
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
        axios.get(`http://localhost:8000/api/jobs/${id}`)
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



    const deleteJob = () =>{
        axios.delete(`http://localhost:8000/api/jobs/${id}`)
        .then(response => navigate("/"))
        .catch(err => console.log(err))
    }




    return (
        <div>
            {
                notFound === true?
                <p>CANNOT BE FOUND</p>:
                // NEED THE <> BELOW BECAUSE WE CAN ONLY USE ONE PARENT ELEMENT
                // THIS LETS US USE TWO
            <>
                <h3>Job Title: {details.title}</h3>
                <h4>Company: {details.company}</h4>
                <h5>Salary: {details.salary}</h5>
                <h5>Remote: {details.isRemote? "Yes":"No"} </h5>
                <h5>Applied:{details.title? "Yes":"No"} </h5>
                <h5>Color: {details.jobType}</h5>
                <h5>Date: {details.testDate}</h5>
                <button onClick={deleteJob} className="btn btn-danger mt-3">DELETE {details.title} </button>
                
                 <Link to={`/edit/${ details._id}`} className="btn btn-primary">EDIT</Link>
                  
            </>
}
        </div>
    )
}

export default OneJob;