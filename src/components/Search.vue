<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Sign your ingredients"
      aria-label="Ingredient"
      aria-describedby="button-addon2"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
    <button
      class="btn btn-outline-secondary"
      type="button"
      id="button-addon2"
      @click="$emit('clear-search')"
    >
      Clear
    </button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    value: String,
  },
};
</script>

<style scoped></style>
