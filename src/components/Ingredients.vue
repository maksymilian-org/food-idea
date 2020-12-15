<template>
  <ul class="list-group list-group-horizontal mb-3" v-if="ingredients.length">
    <li
      class="list-group-item p-2"
      v-for="ingredient in ingredients"
      :key="ingredient.id"
    >
      {{ ingredient.name }}
      <span
        class="badge badge-danger badge-pill"
        @click="$emit('remove-ingredient', ingredient.id)"
        >x</span
      >
    </li>
    <button
      type="button"
      class="btn btn-primary p-2"
      :style="{ borderRadius: '0 .25rem .25rem 0' }"
      @click="$emit('get-recipes')"
    >
      Get ideas
    </button>
  </ul>
</template>

<script>
export default {
  props: {
    ingredients: Object,
  },
};
</script>

<style></style>
