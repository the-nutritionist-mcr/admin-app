import { allRecipesSelector, fetchRecipes } from "./recipesSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Recipe from "../../domain/Recipe";
import { fetchExclusions } from "../exclusions/exclusionsSlice";

interface UseRecipesReturnValue {
  recipes: Recipe[];
}

const useRecipes = (): UseRecipesReturnValue => {
  const dispatch = useDispatch();

  const recipes = useSelector(allRecipesSelector).sort(recipe => recipe.)

  React.useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
      dispatch(fetchExclusions());
    }
  }, [dispatch]);

  return {
    recipes,
  };
};

export default useRecipes;
