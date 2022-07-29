import "./App.css";
import AllProducts from "./components/AllProducts";
import Form from "./components/Form";
import { Routes, Route } from "react-router-dom";
import OneProduct from "./components/OneProduct";
import EditForm from "./components/EditForm";
import { useState } from "react";

function App() {
  let [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="App">
      <h1>Product Manager</h1>

      <Routes>
        {/* ROUTE TO MAIN PAGE */}
        <Route
          exact
          path="/"
          element={
            <>
              {/* PROPS BEING PASSED IN FROM FORM.JSX */}
              <Form formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}></Form>
              <AllProducts formSubmitted={formSubmitted}></AllProducts>
            </>
          }
        ></Route>
        {/* ROUTE TO DETAILS PAGE */}
        {/* THE :ID HAS TO MATCH THE USEPARAMS ON ONEPRODUCT PAGE */}
        <Route exact path="/products/:id" element={<OneProduct />}></Route>
        {/* ROUTE TO EDIT PAGE WITH PREFILLED */}
        <Route exact path="/products/edit/:id" element={<EditForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
