import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { post } from "aws-amplify/api";
import CircularProgress from "@mui/material/CircularProgress";

function ListRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const client = generateClient();
  const navigate = useNavigate();

  const getRecipes = async () => {
    try {
      const recipeList = await client.graphql({
        query: queries.listRecipes,
      });
      const result = recipeList.data;
      console.log("list of recipes: ", result);
      setRecipes(result.listRecipes.items); // Update the state with fetched recipes
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const handleEditRecipe = (recipe) => {
    navigate("/editrecipe", { state: { recipe } });
  };

  const confirmDeleteRecipe = async (recipeId) => {
    try {
      await client.graphql({
        query: mutations.deleteRecipe,
        variables: { input: { id: recipeId } },
      });

      await getRecipes();
      console.log("Recipe deleted successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSend = async (recipe) => {
    try {
      const data = {
        emailID: email,
        recipe: recipe,
      };
      console.log("Sending email to:", email);
      const response = await post({
        mode: "no-cors",
        apiName: "recipeRESTAPI",
        path: "/sendmyrecipe",
        options: {
          body: data,
        },
      });
      console.log("api cal succeessss: ", response);
    } catch (err) {
      console.log("err:: ", err);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: 600, md: 800, lg: 1000 },
        width: "100%",
        margin: "0 auto",
        paddingX: { xs: 0, md: "20px" },
        paddingY: "20px",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "40px" }}
      >
        Recipes
      </Typography>
      {loading ? ( // Display loading icon if loading is true
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {recipes.map((recipe) => (
            <Grid key={recipe.recipeId} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://recipeimages172953-staging.s3.amazonaws.com/public/${recipe.image}`}
                  alt={recipe.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" noWrap>
                    {recipe.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Ingredients: {recipe.ingredients}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Instructions: {recipe.instructions}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleEditRecipe(recipe)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => openModal(recipe)}>
                    <ShareIcon color="action" />
                  </IconButton>
                  <IconButton onClick={() => confirmDeleteRecipe(recipe.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Modal
        open={isModalOpen && selectedRecipe !== null}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            mb={2}
          />
          <IconButton onClick={() => handleSend(selectedRecipe)}>
            <SendIcon />
          </IconButton>
        </Box>
      </Modal>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/newrecipe")}
          sx={{ borderRadius: "30px", width: "200px", height: "50px" }}
        >
          Add New Recipe
        </Button>
      </Box>
    </Box>
  );
}

export default ListRecipe;
