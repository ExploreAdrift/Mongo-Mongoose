import "./App.css";
import AllJobs from "./components/AllJobs";
import Form from "./components/Form";
import { Route, Routes } from "react-router-dom";
import EditForm from "./components/EditForm";
import OneJob from "./components/OneJob";
import React, { useState } from "react";

function App() {
  let [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="App">
      <h1>JOB BOARD</h1>
      <Routes>
        <Route exact path="/" element={<AllJobs />}></Route>
        <Route exact path="/jobs/new" element={<Form formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}></Form>}></Route>
        <Route exact path="/edit/:id" element={<EditForm />}></Route>
        <Route exact path="/jobs/:id" element={<OneJob />}></Route>
      </Routes>
    </div>
  );
}

export default App;
