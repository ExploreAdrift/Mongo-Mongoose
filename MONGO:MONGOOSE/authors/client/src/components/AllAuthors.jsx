import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const AllAuthors = (props) => {

    let [authors, setAuthor] = useState([]);
    let [authorDeleted, setAuthorDeleted] = useState(false)
    const navigate = useNavigate

   useEffect(() => {
    axios.get("http://localhost:8000/api/authors")
        .then((response) => {
            console.log("response: ",response);
            setAuthor(response.data.results);
        })
        .catch(err => console.log(err))
}, [authorDeleted, props.formSubmitted])

    const deleteAuthor = (id) =>{
            axios.delete(`http://localhost:8000/api/authors/${id}`)
            .then(response => {
                setAuthorDeleted(!authorDeleted)
                // WILL DELETE FROM DB AND UPDATE STATE VARIABLE AND SET IT TO OPPOSITE,
                // WITH productDELETED IN LINE 19, BEING UPDATED, IT WLL CAUSE IT TO RUN AGAIN.
            })
            .catch(err => console.log(err))

        }
    return(
        <div>
            <div>
                <h1>FAVORITE AUTHORS</h1>
            </div>
            <div>
                <Link to="/new">ADD AN AUTHOR</Link>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>AUTHOR</th>
                            <th>ACTION AVAILABLE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            authors.map(author =>{
                                return(
                                    <tr key = {author._id}>
                                        <td>{author.name}</td>
                                        <td>
                                             <button onClick={() => deleteAuthor(author._id)} className="btn btn-danger mt-3">DELETE {author.name}</button>
                                            <Link to = {`/edit/${author._id}`}className="btn btn-warning mt-3">EDIT {author.name}</Link>
                                            <Link to={"/"} className="btn btn-warning">CANCEL</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
                        
                        
                            
                        
                    

    
   
    )
    }


export default AllAuthors;