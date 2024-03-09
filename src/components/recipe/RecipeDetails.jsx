// RecipeDetails.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const RecipeDetails = () => {
  const location = useLocation();
  const { recipe } = location.state || {}; // Access recipe from location state or default to empty object

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: "100%",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Typography variant="h3" gutterBottom>
        {recipe ? recipe.title : "Recipe Not Found"}
      </Typography>
      {recipe && (
        <>
          <Typography variant="h5" gutterBottom>
            Ingredients:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {recipe.ingredients}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Instructions:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {recipe.instructions}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default RecipeDetails;
