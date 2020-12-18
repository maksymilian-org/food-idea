<template>
  <div>
    <div class="row">
      <div class="col-4">
        <img :src="state.image" :alt="state.title" />
      </div>
      <div class="col-8">
        <div>
          <p v-html="state.summary"></p>
        </div>
      </div>
    </div>
    <div>
      <span class="badge badge-warning mr-1"
        >{{ state.readyInMinutes }}min</span
      >
      <span class="badge badge-danger mr-1">{{ state.pricePerServing }} $</span>
      <span class="badge badge-success mr-1" v-if="state.glutenFree">
        gluten free
      </span>
      <span class="badge badge-success mr-1" v-if="state.diaryFree">
        diary free
      </span>
      <span class="badge badge-success mr-1" v-if="state.vegan">
        vegan
      </span>
      <span class="badge badge-success mr-1" v-if="state.vegetarian">
        vegetarian
      </span>
      <span
        v-for="dishType in state.dishTypes"
        :dishType="dishType"
        :key="dishType"
        class="badge badge-dark mr-1"
        >{{ dishType }}</span
      >
      <div class="row">
        <div class="col">
          <ul class="list-group mt-3">
            <li
              class="list-group-item"
              v-for="ingredient in state.extendedIngredients"
              :ingredient="ingredient"
              :key="ingredient.id"
            >
              {{ ingredient.original }}
            </li>
          </ul>
        </div>
        <div class="col">
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item"
              v-for="step in state.analyzedInstructions[0].steps"
              :step="step"
              :key="step.number"
            >
              <strong>{{ step.number }})</strong> {{ step.step }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watchEffect } from 'vue';
export default {
  props: {
    apiKey: String,
    recipeId: String,
  },
  setup(props) {
    const state = reactive({
      image: '',
      title: '',
      summary: '',
      readyInMinutes: '',
      pricePerServing: '',
      glutenFree: '',
      diaryFree: '',
      vegan: '',
      vegetarian: '',
      dishTypes: [],
      extendedIngredients: [],
      analyzedInstructions: [{ steps: [] }],
    });
    let timer = '';

    const getRecipeInfo = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetch(
          `https://api.spoonacular.com/recipes/${props.recipeId}/information?${props.apiKey}`
        )
          .then((res) => res.json())
          .then((json) => {
            Object.entries(json).map(([key, value]) => {
              state[key] = value;
            });
          });
      }, 500);
    };

    watchEffect(() => {
      if (props.recipeId) getRecipeInfo();
    });

    return { state };
  },
};
</script>

<style scoped lang="scss"></style>
