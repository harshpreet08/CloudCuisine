import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations";
import { TextField, Button, FormHelperText } from "@mui/material";
import "./RecipeForm.css"; // Import the CSS file here
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { uploadData } from "aws-amplify/storage";
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

function EditRecipeForm({ image: initialImage }) {
  const location = useLocation();
  const { recipe } = location.state ?? {};
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState(initialImage);
  const client = generateClient();
  const navigate = useNavigate();

  const imageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const removeImage = () => {
    console.log("aagya remove karne");
    setImage(null);
    recipe.image = "";
  };

  const uploadImage = async (file) => {
    try {
      const imageName = `${Date.now()}-${file.name}`;
      const result = await uploadData({
        key: imageName,
        data: file,
      }).result;
      console.log("image result: ", result);
      return result.key;
    } catch (err) {
      console.log("error: ", err);
      return null;
    }
  };

  const handleTitleChange = (event) => {
    setRecipeTitle(event.target.value);
  };

  const handleIngredientsChange = (event) => {
    setRecipeIngredients(event.target.value);
  };

  const handleInstructionsChange = (event) => {
    setRecipeInstructions(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      let img = recipe.image; // Use existing image if no new image is uploaded

      if (image) {
        img = await uploadImage(image);
      }

      if (!recipeTitle || !recipeIngredients || !recipeInstructions) {
        setError(true);
        return;
      }

      const newRecipe = await client.graphql({
        query: mutations.updateRecipe,
        variables: {
          input: {
            id: recipe.id,
            title: recipeTitle,
            ingredients: recipeIngredients,
            instructions: recipeInstructions,
            image: img || null,
          },
        },
      });

      const result = newRecipe.data;
      console.log("recipe call success: ", result);
      setError(false);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
    navigate("/");
  };

  useEffect(() => {
    if (recipe) {
      setRecipeTitle(recipe.title);
      setRecipeIngredients(recipe.ingredients);
      setRecipeInstructions(recipe.instructions);
    }
  }, [recipe]);

  return (
    <div className={`RecipeForm ${error ? "error" : ""}`}>
      <main>
        <div className="content">
          <div className="add-recipe-form">
            <h2>Edit Recipe</h2>
            <div className="form-group">
              {/* Title Input */}
              <TextField
                label="Title"
                id="title"
                name="title"
                value={recipeTitle}
                onChange={handleTitleChange}
                required
                sx={{ width: "100%", marginBottom: "20px" }}
                error={error && !recipeTitle}
              />
              {error && !recipeTitle && (
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
                value={recipeIngredients}
                onChange={handleIngredientsChange}
                required
                sx={{ width: "100%", marginBottom: "20px" }}
                error={error && !recipeIngredients}
              />
              {error && !recipeIngredients && (
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
                value={recipeInstructions}
                onChange={handleInstructionsChange}
                required
                sx={{ width: "100%", marginBottom: "20px" }}
                error={error && !recipeInstructions}
              />
              {error && !recipeInstructions && (
                <FormHelperText error>Please enter instructions</FormHelperText>
              )}
            </div>
            <div className="form-group">
              {/* Image Input */}
              {recipe.image && (
                <div className="image-upload-preview">
                  <span>{recipe.image}</span>
                  <Button onClick={removeImage}>
                    <CloseIcon />
                  </Button>
                </div>
              )}
              {image && !recipe.image && (
                <div className="image-upload-preview">
                  <span>{image.name}</span>
                  <Button onClick={removeImage}>
                    <CloseIcon />
                  </Button>
                </div>
              )}
              <label htmlFor="recipeImage">
                <Button
                  component="span"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                </Button>
              </label>
              <input
                id="recipeImage"
                type="file"
                accept="image/*"
                onChange={imageUpload}
                style={{ display: "none" }}
              />
            </div>

            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              className="submitbtn"
            >
              Edit Recipe
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditRecipeForm;
