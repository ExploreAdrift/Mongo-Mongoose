import "./App.css";
import AllAuthors from "./components/AllAuthors";
import Form from "./components/Form";
import { Route, Routes } from "react-router-dom";
import EditForm from "./components/EditForm";
import React, { useState } from "react";

function App() {
  let [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<AllAuthors />}></Route>
        <Route exact path="/new" element={<Form formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}></Form>}></Route>
        <Route exact path="/edit/:id" element={<EditForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
