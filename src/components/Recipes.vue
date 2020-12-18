<template>
  <div class="row" v-if="recipes.length">
    <div
      class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
      v-for="recipe in recipes"
      v-bind:key="recipe.id"
    >
      <div class="card" :style="{ height: '100%' }">
        <img :src="recipe.image" class="card-img-top" alt="recipe.title" />
        <div class="card-body">
          <h5 class="card-title">{{ recipe.title }}</h5>
        </div>
        <div class="card-body">
          <button
            type="button"
            class="btn btn-link"
            @click="$emit('preview-recipe', recipe)"
          >
            Preview
          </button>
          <router-link
            class="btn btn-link"
            :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
            >Open</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipes: Array,
  },
};
</script>

<style></style>
