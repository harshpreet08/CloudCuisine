/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onCreateRecipe(filter: $filter, owner: $owner) {
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
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onUpdateRecipe(filter: $filter, owner: $owner) {
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
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onDeleteRecipe(filter: $filter, owner: $owner) {
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
