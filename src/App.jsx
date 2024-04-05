import React, { useState, useEffect } from "react";
import "./App.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "./aws-exports";
import { Amplify } from "aws-amplify";
import "aws-amplify/auth/enable-oauth-listener";
import RecipeForm from "./components/recipe/RecipeForm";
import EditRecipe from "./components/recipe/EditRecipe"; // Import EditRecipeForm component
import Navbar from "./components/Navbar/Navbar";
import ListRecipe from "./components/recipe/ListRecipe";
import RecipeDetails from "./components/recipe/RecipeDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator
      variation="modal"
      socialProviders={["google"]}
      formFields={{
        signUp: {
          picture: {
            defaultValue: "",
            placeholder: "Picture",
          },
        },
      }}
    >
      {({ signOut, user }) => (
        <Router>
          <div className="App">
            <Navbar user={user} signOut={signOut} />
            <Routes>
              <Route exact path="/" element={<ListRecipe />} />
              <Route exact path="/newrecipe" element={<RecipeForm />} />
              <Route exact path="/editrecipe" element={<EditRecipe />} />{" "}
              <Route exact path="/recipe/:id" element={<RecipeDetails />} />{" "}
              {/* Add this route */}
            </Routes>
          </div>
        </Router>
      )}
    </Authenticator>
  );
}

export default App;
