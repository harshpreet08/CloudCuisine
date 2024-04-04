// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Card, CardMedia, Container } from "@mui/material";
// import { generateClient } from "aws-amplify/api";
// import * as queries from "../../graphql/queries";

// const RecipeDetails = () => {
//   const { id } = useParams(); // Get the id from the route parameter
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const client = generateClient();

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const recipeData = await client.graphql({
//           query: queries.getRecipe, // Replace this with your GraphQL query to get a single recipe by id
//           variables: { id },
//         });
//         const fetchedRecipe = recipeData.data.getRecipe;
//         // Assuming the image URL is fetched from a different field
//         const imageURL = `https://recipeimages172953-staging.s3.amazonaws.com/public/${fetchedRecipe.image}`;
//         setRecipe({ ...fetchedRecipe, image: imageURL });
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching recipe:", error);
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   return (
//     <Container maxWidth="md">
//       {loading ? (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//             fontFamily: "Roboto, sans-serif", // Professional font
//           }}
//         >
//           Loading...
//         </Box>
//       ) : (
//         <Box mt={4} fontFamily="Roboto, sans-serif">
//           {" "}
//           {/* Professional font */}
//           <Typography variant="h3" gutterBottom align="center">
//             {recipe ? recipe.title : "Recipe Not Found"}
//           </Typography>
//           <Card>
//             {recipe.image && (
//               <CardMedia
//                 component="img"
//                 image={recipe.image}
//                 alt={recipe.title}
//                 sx={{
//                   height: 400,
//                   objectFit: "cover",
//                   maxWidth: "100%",
//                 }}
//               />
//             )}
//             <Box p={2}>
//               <Typography variant="h5" gutterBottom>
//                 Ingredients:
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 {recipe.ingredients}
//               </Typography>
//               <Typography variant="h5" gutterBottom>
//                 Instructions:
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 {recipe.instructions}
//               </Typography>
//             </Box>
//           </Card>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default RecipeDetails;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import { FavoriteBorderOutlined, ShareOutlined } from "@mui/icons-material";

const RecipeDetails = () => {
  const { id } = useParams(); // Get the id from the route parameter
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const client = generateClient();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await client.graphql({
          query: queries.getRecipe, // Replace this with your GraphQL query to get a single recipe by id
          variables: { id },
        });
        const fetchedRecipe = recipeData.data.getRecipe;
        // Assuming the image URL is fetched from a different field
        const imageURL = `https://recipeimages172953-staging.s3.amazonaws.com/public/${fetchedRecipe.image}`;
        setRecipe({ ...fetchedRecipe, image: imageURL });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleShare = () => {
    // Logic for sharing the recipe
    alert("Recipe shared!");
  };

  const handleLike = () => {
    // Logic for liking the recipe
    alert("Recipe liked!");
  };

  return (
    <Container maxWidth="md">
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontFamily: "Roboto, sans-serif", // Professional font
          }}
        >
          Loading...
        </Box>
      ) : (
        <Box mt={4} fontFamily="Roboto, sans-serif">
          {/* Professional font */}
          <Typography variant="h3" gutterBottom align="center">
            {recipe ? recipe.title : "Recipe Not Found"}
          </Typography>
          <Card>
            {recipe.image && (
              <CardMedia
                component="img"
                image={recipe.image}
                alt={recipe.title}
                sx={{
                  height: 400,
                  objectFit: "cover",
                  maxWidth: "100%",
                }}
              />
            )}
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom>
                    Ingredients:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {recipe.ingredients}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom>
                    Instructions:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {recipe.instructions}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default RecipeDetails;
