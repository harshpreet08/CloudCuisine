/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecipe = /* GraphQL */ `
  mutation CreateRecipe(
    $input: CreateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    createRecipe(input: $input, condition: $condition) {
      recipeId
      title
      ingredients
      instructions
      image
      spiceTag
      foodPreferenceTag
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateRecipe = /* GraphQL */ `
  mutation UpdateRecipe(
    $input: UpdateRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    updateRecipe(input: $input, condition: $condition) {
      recipeId
      title
      ingredients
      instructions
      image
      spiceTag
      foodPreferenceTag
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteRecipe = /* GraphQL */ `
  mutation DeleteRecipe(
    $input: DeleteRecipeInput!
    $condition: ModelRecipeConditionInput
  ) {
    deleteRecipe(input: $input, condition: $condition) {
      recipeId
      title
      ingredients
      instructions
      image
      spiceTag
      foodPreferenceTag
      id
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
