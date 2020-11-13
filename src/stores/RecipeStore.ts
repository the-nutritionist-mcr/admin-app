import { ActionTypes } from "../actions/recipes";
import { EventEmitter } from "events";
import Recipe from "../domain/Recipe";
import dispatcher from "../appDispatcher";

const CHANGE_EVENT = "change";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => void;

// eslint-disable-next-line fp/no-let
let recipes: Recipe[] = [];

class RecipeStore extends EventEmitter {
  public addChangeListener(callback: Callback): void {
    this.on(CHANGE_EVENT, callback);
  }

  public removeChangeListener(callback: Callback): void {
    this.removeListener(CHANGE_EVENT, callback);
  }

  public emitChange(): void {
    this.emit(CHANGE_EVENT);
  }

  public getById(id: number): Recipe | undefined {
    return recipes.find((recipe) => recipe.id === id);
  }

  public getRecipes(): Recipe[] {
    return recipes;
  }
}

const recipeStore = new RecipeStore();

dispatcher.register((payload) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payloadAsAny = payload as any;

  switch (payloadAsAny.actionTypes) {
    case ActionTypes.GetRecipes:
    case ActionTypes.CreateBlankRecipe:
    case ActionTypes.UpdateRecipe:
    case ActionTypes.DeleteRecipe:
      recipes = payloadAsAny.recipes;
      recipeStore.emitChange();
      break;
  }
});

export default recipeStore;
