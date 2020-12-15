<template>
  <div class="container mb-3">
    <h1>Food Idea</h1>
    <h4 class="mb-3">
      Do you have ingredients, but don't know what food you may prepare?
    </h4>
    <Search v-model:value="state.search" @clear-search="clearSearch" />
    <Ingredients
      v-bind:ingredients="state.ingredients"
      @remove-ingredient="removeIngredient"
      @get-recipes="getRecipes"
    />
    <IngredientsPreview
      :ingredients-preview="state.ingredientsPreview"
      @add-ingredient="addIngredient"
    />
    <Recipes :recipes="state.recipes" @preview-recipe="previewRecipe" />
    <Recipe
      :recipe="state.recipe"
      @close-recipe="closeRecipe"
      :apiKey="state.apiKey"
    />
  </div>
</template>

<script>
import Search from './components/Search.vue';
import Ingredients from './components/Ingredients';
import IngredientsPreview from './components/IngredientsPreview';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import { reactive, watchEffect } from 'vue';

export default {
  name: 'App',
  components: {
    Search,
    Ingredients,
    IngredientsPreview,
    Recipes,
    Recipe,
  },
  setup() {
    const state = reactive({
      search: '',
      ingredients: [],
      ingredientsPreview: [],
      recipes: [],
      recipe: null,
      apiKey: 'apiKey=c9c8b9e56bc24b6f8baa7520ab3d7f66',
    });

    let timer = '';
    const apiUrl = 'https://api.spoonacular.com';
    const number = 'number=12';

    watchEffect(() => {
      if (state.search) getIngredients(state.search);
      else state.ingredientsPreview = [];
    });

    const getIngredients = (ingredients) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetch(
          `${apiUrl}/food/ingredients/search?query=${ingredients}&${number}&${state.apiKey}`
        )
          .then((res) => res.json())
          .then((json) => {
            if (state.search) state.ingredientsPreview = json.results;
          });
      }, 500);
    };

    const addIngredient = (ingredient) => {
      if (!state.ingredients.some((i) => i.id === ingredient.id)) {
        state.ingredients.push(ingredient);
      }
    };

    const removeIngredient = (ingredientId) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== ingredientId
      );
    };

    const getRecipes = () => {
      state.ingredientsPreview = [];
      const ingredients = state.ingredients.map((i) => i.name).join(',+');
      fetch(
        `${apiUrl}/recipes/findByIngredients?ingredients=${ingredients}&${number}&${state.apiKey}`
      )
        .then((res) => res.json())
        .then((json) => {
          state.recipes = json;
        });
    };

    const clearSearch = () => {
      state.search = '';
      state.ingredientsPreview = [];
    };

    const previewRecipe = (recipe) => {
      state.recipe = recipe;
    };

    const closeRecipe = () => {
      state.recipe = null;
    };

    return {
      state,
      addIngredient,
      removeIngredient,
      getRecipes,
      clearSearch,
      previewRecipe,
      closeRecipe,
    };
  },
};
</script>

<style>
@import url('../node_modules/bootstrap/dist/css/bootstrap.min.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

img {
  max-width: 100%;
}
</style>
