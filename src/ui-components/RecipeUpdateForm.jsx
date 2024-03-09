/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getRecipe } from "../graphql/queries";
import { updateRecipe } from "../graphql/mutations";
const client = generateClient();
export default function RecipeUpdateForm(props) {
  const {
    id: idProp,
    recipe: recipeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    recipeId: "",
    title: "",
    ingredients: "",
    instructions: "",
    image: "",
    spiceTag: "",
    foodPreferenceTag: "",
  };
  const [recipeId, setRecipeId] = React.useState(initialValues.recipeId);
  const [title, setTitle] = React.useState(initialValues.title);
  const [ingredients, setIngredients] = React.useState(
    initialValues.ingredients
  );
  const [instructions, setInstructions] = React.useState(
    initialValues.instructions
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [spiceTag, setSpiceTag] = React.useState(initialValues.spiceTag);
  const [foodPreferenceTag, setFoodPreferenceTag] = React.useState(
    initialValues.foodPreferenceTag
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = recipeRecord
      ? { ...initialValues, ...recipeRecord }
      : initialValues;
    setRecipeId(cleanValues.recipeId);
    setTitle(cleanValues.title);
    setIngredients(cleanValues.ingredients);
    setInstructions(cleanValues.instructions);
    setImage(cleanValues.image);
    setSpiceTag(cleanValues.spiceTag);
    setFoodPreferenceTag(cleanValues.foodPreferenceTag);
    setErrors({});
  };
  const [recipeRecord, setRecipeRecord] = React.useState(recipeModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getRecipe.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getRecipe
        : recipeModelProp;
      setRecipeRecord(record);
    };
    queryData();
  }, [idProp, recipeModelProp]);
  React.useEffect(resetStateValues, [recipeRecord]);
  const validations = {
    recipeId: [],
    title: [],
    ingredients: [],
    instructions: [],
    image: [],
    spiceTag: [],
    foodPreferenceTag: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          recipeId: recipeId ?? null,
          title: title ?? null,
          ingredients: ingredients ?? null,
          instructions: instructions ?? null,
          image: image ?? null,
          spiceTag: spiceTag ?? null,
          foodPreferenceTag: foodPreferenceTag ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateRecipe.replaceAll("__typename", ""),
            variables: {
              input: {
                id: recipeRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "RecipeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Recipe id"
        isRequired={false}
        isReadOnly={false}
        value={recipeId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recipeId: value,
              title,
              ingredients,
              instructions,
              image,
              spiceTag,
              foodPreferenceTag,
            };
            const result = onChange(modelFields);
            value = result?.recipeId ?? value;
          }
          if (errors.recipeId?.hasError) {
            runValidationTasks("recipeId", value);
          }
          setRecipeId(value);
        }}
        onBlur={() => runValidationTasks("recipeId", recipeId)}
        errorMessage={errors.recipeId?.errorMessage}
        hasError={errors.recipeId?.hasError}
        {...getOverrideProps(overrides, "recipeId")}
      ></TextField>
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recipeId,
              title: value,
              ingredients,
              instructions,
              image,
              spiceTag,
              foodPreferenceTag,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Ingredients"
        isRequired={false}
        isReadOnly={false}
        value={ingredients}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recipeId,
              title,
              ingredients: value,
              instructions,
              image,
              spiceTag,
              foodPreferenceTag,
            };
            const result = onChange(modelFields);
            value = result?.ingredients ?? value;
          }
          if (errors.ingredients?.hasError) {
            runValidationTasks("ingredients", value);
          }
          setIngredients(value);
        }}
        onBlur={() => runValidationTasks("ingredients", ingredients)}
        errorMessage={errors.ingredients?.errorMessage}
        hasError={errors.ingredients?.hasError}
        {...getOverrideProps(overrides, "ingredients")}
      ></TextField>
      <TextField
        label="Instructions"
        isRequired={false}
        isReadOnly={false}
        value={instructions}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recipeId,
              title,
              ingredients,
              instructions: value,
              image,
              spiceTag,
              foodPreferenceTag,
            };
            const result = onChange(modelFields);
            value = result?.instructions ?? value;
          }
          if (errors.instructions?.hasError) {
            runValidationTasks("instructions", value);
          }
          setInstructions(value);
        }}
        onBlur={() => runValidationTasks("instructions", instructions)}
        errorMessage={errors.instructions?.errorMessage}
        hasError={errors.instructions?.hasError}
        {...getOverrideProps(overrides, "instructions")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recipeId,
              title,
              ingredients,
              instructions,
              image: value,
              spiceTag,
              foodPreferenceTag,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Spice tag"
        isRequired={false}
        isReadOnly={false}
        value={spiceTag}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recipeId,
              title,
              ingredients,
              instructions,
              image,
              spiceTag: value,
              foodPreferenceTag,
            };
            const result = onChange(modelFields);
            value = result?.spiceTag ?? value;
          }
          if (errors.spiceTag?.hasError) {
            runValidationTasks("spiceTag", value);
          }
          setSpiceTag(value);
        }}
        onBlur={() => runValidationTasks("spiceTag", spiceTag)}
        errorMessage={errors.spiceTag?.errorMessage}
        hasError={errors.spiceTag?.hasError}
        {...getOverrideProps(overrides, "spiceTag")}
      ></TextField>
      <TextField
        label="Food preference tag"
        isRequired={false}
        isReadOnly={false}
        value={foodPreferenceTag}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recipeId,
              title,
              ingredients,
              instructions,
              image,
              spiceTag,
              foodPreferenceTag: value,
            };
            const result = onChange(modelFields);
            value = result?.foodPreferenceTag ?? value;
          }
          if (errors.foodPreferenceTag?.hasError) {
            runValidationTasks("foodPreferenceTag", value);
          }
          setFoodPreferenceTag(value);
        }}
        onBlur={() =>
          runValidationTasks("foodPreferenceTag", foodPreferenceTag)
        }
        errorMessage={errors.foodPreferenceTag?.errorMessage}
        hasError={errors.foodPreferenceTag?.hasError}
        {...getOverrideProps(overrides, "foodPreferenceTag")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || recipeModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || recipeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
