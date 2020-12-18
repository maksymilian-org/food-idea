<template>
  <div id="nav"><router-link to="/">&laquo; Back to home</router-link></div>
  <div class="container text-left">
    <RecipeContent
      :recipeId="$route.params.recipeId"
      apiKey="apiKey=c9c8b9e56bc24b6f8baa7520ab3d7f66"
    />
  </div>
</template>

<script>
import RecipeContent from '@/components/RecipeContent.vue';
export default {
  components: { RecipeContent },
};
</script>
