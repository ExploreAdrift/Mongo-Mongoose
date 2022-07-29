import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import moment from "moment";

const AllJobs = (props) => {
  let [jobs, setJobs] = useState([]);
  let [jobDeleted, setJobDeleted] = useState(false);
 

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/jobs")
      .then((response) => {
        console.log("response: ", response);
        setJobs(response.data.results);
      })
      .catch((err) => console.log(err))
  }, [jobDeleted, props.formSubmitted])

  const deleteJob = (id) => {
    axios
      .delete(`http://localhost:8000/api/jobs/${id}`)
      .then((response) => {
        setJobDeleted(!jobDeleted);
        // WILL DELETE FROM DB AND UPDATE STATE VARIABLE AND SET IT TO OPPOSITE,
        // WITH productDELETED IN LINE 19, BEING UPDATED, IT WLL CAUSE IT TO RUN AGAIN.
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>
        <Link to="/jobs/new">CREATE A NEW JOB</Link>
      </div>
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>TITLE</th>
              <th>COMPANY</th>
              <th>SALARY</th>
              <th>REMOTE?</th>
             <th>COLOR</th>
             <th>DATE</th>
               <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              return (
                <tr key={job._id}>
                  <td><p><Link to={`/jobs/${job._id}`}>{job.title}</Link></p></td>
                  <td>{job.company}</td>
                  <td>{job.salary}</td>
                  <td>{job.isRemote?"Yes":"No"}</td>
                  <td>{job.jobType}</td>
                  <td>{moment(job.testDate).format("MMMM Do, YYYY")}</td>
                  <td>
                    <button onClick={() => deleteJob(job._id)} className="btn btn-danger mt-3">
                      DELETE {job.title}
                    </button>
                    <Link to={`/edit/${job._id}`} className="btn btn-warning mt-3">
                      EDIT {job.title}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllJobs;
