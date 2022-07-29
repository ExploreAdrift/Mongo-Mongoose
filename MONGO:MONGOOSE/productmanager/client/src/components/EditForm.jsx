import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// USE PARAMS TO GET THE ID OF THE PERSON/THING WE ARE PREFILLING

const EditForm = () => {

    const {id} = useParams()
    const [details, setDetails] = useState({})
    const navigate = useNavigate();


    // COPIED FROM ONEPRODUCT
     useEffect(()=>{
        axios.get(`http://localhost:8000/api/managers/${id}`)
        .then(response =>{
            console.log(response)
            if(response.data.results){
            // WE GET RESPONSE.DATA.RESULTS FROM THE CONSOLE.LOG
            setDetails(response.data.results) 
            }
        })
        .catch(err => console.log(err))

    },[])


    // TO GET THE ABILITY TO ACTUALLY EDIT, WE NEED changeHandler

    const changeHandler = (event) => {
        setDetails({
            ...details,
            [event.target.name]: event.target.value
            // FOR CHECKEDBOX --> ELSE {setDetails [e.target.name]: e.target.checked}
        })
    }


        // COPIED FROM FORM.JSX, LOOK FOR CHANGES (AXIOS.PUT, ETC)
    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/managers/${id}`, details)
        .then(response => {
            console.log("response", response)
            navigate("/")
           
        })
        .catch(err => console.log(err))

    }
   
    return (

         // FOR EDIT ERASE: ONCHANGE(INITIAL),FORM ERROR LINE, ONSUBMIT IN FORM TAG 
        // LEAVE BASIC FORM COPIED FROM "FORM".
        // TO GET PREPOPULATION USE VALUE EX  "value={details.title}"
        //  IF CHECKED INPUT IS HERE WE DO checked={detailed.example}
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label> Title: </label>
                    <input name='title' type="text" className="form-control" value={details.title || ""} onChange={changeHandler}/>
                </div>
                
                <div className="form-group">
                    <label> Price: </label>
                    <input name='price' type="text" className="form-control" value={details.price || ""} onChange={changeHandler} />
                </div>
                
                <div className="form-group">
                    <label> Description: </label>
                    <input name='description' type="text" className="form-control" value={details.description || ""} onChange={changeHandler} />
                </div>
                <input value="Edit" type="submit" className="btn btn-success m-4" onChange={changeHandler}  />
            </form>
        </div>
    )
}

export default EditForm;