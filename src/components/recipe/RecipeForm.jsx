import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";
import { TextField, Button, FormHelperText } from "@mui/material";
import "./RecipeForm.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadData } from "aws-amplify/storage";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function RecipeForm() {
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const initialRecipe = location.state
    ? location.state.recipe
    : {
        title: "",
        ingredients: "",
        instructions: "",
      };
  console.log(
    "this is the data passed to recipe form component",
    initialRecipe
  );
  const [recipe, setRecipe] = useState(initialRecipe);
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");

  const imageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileClear = () => {
    setSelectedFile(null);
  };

  const imageClear = () => {
    setImage(null);
  };
  const uploadImage = async (file) => {
    try {
      const imageName = `${Date.now()}-${file.name}`;
      const result = await uploadData({
        key: imageName,
        data: file,
      }).result;
      console.log("image resultult: ", result);
      return result.key;
    } catch (err) {
      console.log("errorrrrr: ", err);
      return null;
    }
  };

  const client = generateClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let img = null;

      // Check if an image has been uploaded
      if (selectedFile) {
        img = await uploadImage(selectedFile);

        // If there's an error uploading the image, stop further processing
        if (!img) {
          return;
        }
      }

      if (!recipe.title || !recipe.ingredients || !recipe.instructions) {
        setError(true);
        return;
      }

      console.log("this is the data", recipe);

      const newRecipe = await client.graphql({
        query: mutations.createRecipe,
        variables: {
          input: {
            title: recipe.title,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            image: img, // Pass the image only if it exists
          },
        },
      });

      const result = newRecipe.data;
      console.log("recipe call success: " + result);
      setRecipe({
        title: "",
        ingredients: "",
        instructions: "",
      });
      setError(false);
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
    navigate("/");
  };

  return (
    <div className={`RecipeForm ${error ? "error" : ""}`}>
      <main>
        <div className="content">
          <div className="add-recipe-form">
            <h2>Add Recipe</h2>
            <div className="form-group">
              {/* Title Input */}
              <TextField
                label="Title"
                id="title"
                name="title"
                value={recipe.title}
                onChange={handleChange}
                required
                sx={{ width: "100%", marginBottom: "20px" }}
                error={error && !recipe.title}
              />
              {error && !recipe.title && (
                <FormHelperText error>Please enter a title</FormHelperText>
              )}
            </div>
            <div className="form-group">
              {/* Ingredients Input */}
              <TextField
                label="Ingredients"
                id="ingredients"
                name="ingredients"
                multiline
                rows={4}
                value={recipe.ingredients}
                onChange={handleChange}
                required
                sx={{ width: "100%", marginBottom: "20px" }}
                error={error && !recipe.ingredients}
              />
              {error && !recipe.ingredients && (
                <FormHelperText error>Please enter ingredients</FormHelperText>
              )}
            </div>
            <div className="form-group">
              {/* Instructions Input */}
              <TextField
                label="Instructions"
                id="instructions"
                name="instructions"
                multiline
                rows={4}
                value={recipe.instructions}
                onChange={handleChange}
                required
                sx={{ width: "100%", marginBottom: "20px" }}
                error={error && !recipe.instructions}
              />
              {error && !recipe.instructions && (
                <FormHelperText error>Please enter instructions</FormHelperText>
              )}
            </div>

            <div style={{ justifyContent: "center" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              <div style={{ alignItems: "center", marginBottom: "20px" }}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => document.getElementById("fileInput").click()}
                  style={{ marginRight: "10px" }}
                >
                  Upload
                </Button>
                {selectedFile && (
                  <>
                    <span style={{ marginRight: "10px" }}>
                      {selectedFile.name}
                    </span>
                    <Button onClick={handleFileClear}>
                      <CloseIcon />
                    </Button>
                  </>
                )}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              className="submitbtn"
            >
              Add Recipe
            </Button>
          </div>
          {/* <div className="image-container">
            <img src="/images/cooking.svg" alt="Cooking Illustration" />
          </div> */}
        </div>
      </main>
      {/* <footer>
        <p>© 2024 Recipe Sharing App. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

export default RecipeForm;
