import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// USE PARAMS TO GET THE ID OF THE PERSON/THING WE ARE PREFILLING

const EditForm = (props) => {

    const {id} = useParams()
    const [details, setDetails] = useState({})
    let [authorDeleted, setAuthorDeleted] = useState(false)
    const navigate = useNavigate();


    // COPIED FROM ONEPRODUCT
     useEffect(()=>{
        axios.get(`http://localhost:8000/api/authors/${id}`)
        .then(response =>{
            console.log(response)
            if(response.data.results){
            // WE GET RESPONSE.DATA.RESULTS FROM THE CONSOLE.LOG
            setDetails(response.data.results) 
            }
        })
        .catch(err => console.log(err))

    },[id])

  const deleteAuthor = () =>{
        axios.delete(`http://localhost:8000/api/authors/${id}`)
        .then(response => {
            console.log(response)
            navigate("/")
        })
        .catch()
    }


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
        axios.put(`http://localhost:8000/api/authors/${id}`, details)
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
                    <label> Name:  </label>
                    <input name='name' type="text" className="form-control" value={details.name || ""} onChange={changeHandler}/>
                </div>
                
                <input value="UPDATE" type="submit" className="btn btn-success m-4" onChange={changeHandler}  />
                <button onClick={deleteAuthor} className="btn btn-danger mt-3">DELETE {details.name} </button>
            </form>
        </div>
    )
}

export default EditForm;