<template>
  <teleport to="body">
    <div v-if="recipe" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ recipe.title }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="$emit('close-recipe')"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-4">
                <img :src="recipe.image" :alt="recipe.title" />
              </div>
              <div class="col-8">
                <div v-if="state.recipeInfo">
                  <p v-html="state.recipeInfo.summary"></p>
                </div>
              </div>
            </div>
            <div v-if="state.recipeInfo">
              <span class="badge badge-warning mr-1"
                >{{ state.recipeInfo.readyInMinutes }}min</span
              >
              <span class="badge badge-danger mr-1"
                >{{ state.recipeInfo.pricePerServing }} $</span
              >
              <span
                class="badge badge-success mr-1"
                v-if="state.recipeInfo.glutenFree"
              >
                gluten free
              </span>
              <span
                class="badge badge-success mr-1"
                v-if="state.recipeInfo.diaryFree"
              >
                diary free
              </span>
              <span
                class="badge badge-success mr-1"
                v-if="state.recipeInfo.vegan"
              >
                vegan
              </span>
              <span
                class="badge badge-success mr-1"
                v-if="state.recipeInfo.vegetarian"
              >
                vegetarian
              </span>
              <span
                v-for="dishType in state.recipeInfo.dishTypes"
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
                      v-for="ingredient in state.recipeInfo.extendedIngredients"
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
                      v-for="step in state.recipeInfo.analyzedInstructions[0]
                        .steps"
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="$emit('close-recipe')"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { watchEffect } from 'vue';
export default {
  props: {
    apiKey: String,
    recipe: Object,
  },
  emits: ['close-recipe'],
  setup(props) {
    const state = {
      recipeInfo: null,
    };
    let timer = '';

    const getRecipeInfo = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetch(
          `https://api.spoonacular.com/recipes/${props.recipe?.id}/information?${props.apiKey}`
        )
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            state.recipeInfo = json;
          });
      }, 500);
    };

    watchEffect(() => {
      if (props.recipe) getRecipeInfo();
    });

    return { state };
  },
};
</script>

<style scoped lang="scss">
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  width: calc(100% - 40px);
  max-width: initial;
  height: calc(100vh - 40px);
  margin: 20px;
}

.modal-content {
  height: 100%;
  overflow: auto;
}
</style>
