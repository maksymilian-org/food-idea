<template>
  <div class="row" v-if="ingredientsPreview.length">
    <div
      class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
      v-for="ingredentPreview in ingredientsPreview"
      v-bind:key="ingredentPreview.id"
    >
      <div class="card" :style="{ height: '100%' }">
        <img
          :src="
            'https://spoonacular.com/cdn/ingredients_250x250/' +
              ingredentPreview.image
          "
          class="card-img-top"
          alt="ingredentPreview.name"
        />
        <div class="card-body">
          <h5 class="card-title">{{ ingredentPreview.name }}</h5>
          <button
            type="button"
            class="btn btn-success"
            @click="$emit('add-ingredient', ingredentPreview)"
          >
            +Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ingredientsPreview: Object,
  },
};
</script>

<style lang="scss">
.card {
  align-content: space-between;

  .card-body {
    align-content: flex-end;
    flex: inherit;
  }

  img {
    flex-grow: 1;
    width: auto;
    max-height: 250px;
    object-fit: contain;
  }
}
</style>
