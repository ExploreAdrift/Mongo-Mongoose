import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const Form = (props) => {

    
    

    // THIS LETS US NOT HAVE STATE FOR EVERY MODEL ATTRIBUTE AND ALSO
    // UPDATES ON EACH LETTER ENTRY ALONG WITH HAVING NAME IN INPUT TAG---------------------->

    let [formInfo, setFormInfo] = useState({});
    let [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const changeHandler = (e) => {
        
           if(e.target.type === "checkbox"){
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
        axios.post("http://localhost:8000/api/authors", formInfo).then(response => {
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
        <div>
            <form className='container' onSubmit={submitHandler}>
                <div className="form-group">
                    <label> Name: </label>
                    <input name='name' type="text" className="form-control" onChange={changeHandler}/>
                    <p className='text-danger'>{formErrors.name?.message}</p>
                </div>
                
                <input value="Create" type="submit" className="btn btn-success m-4" onChange={changeHandler} />
            </form>
        </div>
    );
}

export default Form;