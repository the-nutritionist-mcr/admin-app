import { EventEmitter } from "events";
import Recipe from "../domain/Recipe";
import dispatcher from "../appDispatcher";
import { ActionTypes } from "../actions/recipes";

const CHANGE_EVENT = "change";

type Callback = (...args: any[]) => void;

let recipes: Recipe[] = [];

class RecipeStore extends EventEmitter {
  public addChangeListener(callback: Callback) {
    this.on(CHANGE_EVENT, callback);
  }

  public removeChangeListener(callback: Callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  public emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getRecipes() {
    return recipes;
  }
}

const store = new RecipeStore();

dispatcher.register((payload) => {
  const payloadAsAny = payload as any;

  switch (payloadAsAny.actionTypes) {
    case ActionTypes.GetRecipes:
      recipes = payloadAsAny.recipes;
      store.emitChange();
      break;

    case ActionTypes.CreateBlankRecipe:
      recipes = [...recipes, payloadAsAny.recipes];
      store.emitChange();
      break;

    case ActionTypes.UpdateRecipe:
      const [oldRecipe, recipe] = payloadAsAny.recipes;
      const index = recipes.indexOf(oldRecipe);
      recipes[index] = recipe;
      store.emitChange();
      break;
  }
});

export default store;
