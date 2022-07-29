import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";


const Form = (props) => {
    

    // THIS LETS US NOT HAVE STATE FOR EVERY MODEL ATTRIBUTE AND ALSO
    // UPDATES ON EACH LETTER ENTRY ALONG WITH HAVING NAME IN INPUT TAG---------------------->

    let [formInfo, setFormInfo] = useState({});
    let [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate()

    const changeHandler = (e) => {
        
           if(e.target.type == "checkbox"){
            setFormInfo({
                ...formInfo,
                [e.target.name]: e.target.checked
         })
        }else{
        setFormInfo({
            ...formInfo,
            // KEY NAME NEEDS TO BE IN BRACKETS FOR SYNTAX
            [e.target.name]: e.target.value
        })
    } 
}

    // <-------------------------------------------------->

    // WHEN SUBMITTING INCOMPLETE FORM --> RESPONSE.DATA.ERROR IN CONSOLE LOG
    // WHEN SUBMITTING COMPLETE FORM --> RESPONSE.DATA.RESULTS IN CONSOLE LOG
    // IF THERE ARE ANY ERRORS(VALIDATIONS), THEN SAVE THEM TO VARIABLE STATE


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/jobs", formInfo).then(response => {
            console.log("response", response)
            if(response.data.errors){
                setFormErrors(response.data.errors);
            }else{
                setFormErrors({})
                // USING PROPS FROM APP.JS PROPS, AND PROPS FROM LINE 5
                props.setFormSubmitted(!props.formSubmitted)
                navigate("/")
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='container '>
            <form  onSubmit={submitHandler}>
                <div className="form-group">
                    <label className='form-label'> Title: </label>
                    <input name='title' type="text" className="form-control" onChange={changeHandler}/>
                    <p className='text-danger'>{formErrors.title?.message}</p>
                </div>
                
                <div className="form-group">
                    <label className='form-label'> Company: </label>
                    <input name='company' type="text" className="form-control"onChange={changeHandler} />
                    <p className='text-danger'>{formErrors.company?.message}</p>
                </div>
                <div className="form-group">
                    <label className='form-label'> Salary: </label>
                    <input name='salary' type="number" className="form-control"onChange={changeHandler} />
                    <p className='text-danger'>{formErrors.salary?.message}</p>
                </div>

                 <div className="form-group">
                    <label className='form-check-label'> Color:  </label>
                    <select name='jobType' type="select" className="form-control" onChange={changeHandler}  >
                        <option>Blue</option>
                        <option>Black</option>
                        <option>Green</option>
                        <option>White</option>
                    </select >
                    <p className='text-danger'>{formErrors.jobType?.message}</p>
                </div>

                  <div className="form-group">
                    <label className='form-label'> Date: </label>
                    <input name='testDate' type="date" className="form-control"onChange={changeHandler} />
                    <p className='text-danger'>{formErrors.textDate?.message}</p>
                </div>

                <div className='align-items-center d-flex'>
                    <label className='form-check-label'> Remote: </label>
                    <input name='isRemote' type="checkbox" className="form-control form-check-input" onChange={changeHandler} />
                    <p className='text-danger'>{formErrors.isRemote?.message}</p>
                </div>
                <input value="Create" type="submit" className="btn btn-success m-4" onChange={changeHandler} />
                 <Link to={"/"} className="btn btn-warning">CANCEL</Link>
            </form>
        </div>
    );
}

export default Form;