import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
// USE PARAMS TO GET THE ID OF THE PERSON/THING WE ARE PREFILLING

const EditForm = () => {

    const {id} = useParams()
    const [details, setDetails] = useState({})
    const navigate = useNavigate();


    // COPIED FROM ONEPRODUCT
     useEffect(()=>{
        axios.get(`http://localhost:8000/api/jobs/${id}`)
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

     const changeHandler = (e) => {
        
           if(e.target.type == "checkbox"){
            setDetails({
                ...details,
                [e.target.name]: e.target.checked
         })
        }else{
        setDetails({
            ...details,
            // KEY NAME NEEDS TO BE IN BRACKETS FOR SYNTAX
            [e.target.name]: e.target.value
        })
    } 
}


        // COPIED FROM FORM.JSX, LOOK FOR CHANGES (AXIOS.PUT, ETC)
    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/jobs/${id}`, details)
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
                    <label> Company: </label>
                    <input name='company' type="text" className="form-control" value={details.company || ""} onChange={changeHandler} />
                </div>
                <div className="form-group">
                    <label> Salary: </label>
                    <input name='salary' type="number" className="form-control" value={details.salary || ""} onChange={changeHandler} />
                </div>
                
                <div className="form-group">
                    <label className='form-check-label'> Color:  </label>
                    <select name='jobType' type="select" className="form-control" value={details.jobType || ""} onChange={changeHandler}>
                        <option>Blue</option>
                        <option>Black</option>
                        <option>Green</option>
                        <option>White</option>
                    </select>
                </div>
                 <div className="form-group">
                    <label className='form-label'> Date: </label>
                    <input name='testDate' type="date" value={moment(details.testDate || "").format("YYYY-MM-DD")} className="form-control" onChange={changeHandler} />
                 
                </div>

                <div className="form-group d-flex">
                    <label className='form-check-label'> Remote: </label>
                    <input name='isRemote' type="checkbox" className="form-control form-check-input" checked={details.isRemote || ""} onChange={changeHandler} />
                </div>

                <input value="UPDATE" type="submit" className="btn btn-success m-4" onChange={changeHandler}  />
                 <Link to={"/"} className="btn btn-warning">CANCEL</Link>
            </form>
        </div>
    )
}

export default EditForm;