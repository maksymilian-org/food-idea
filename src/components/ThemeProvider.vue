<template>
  <section :style="themes[theme]" class="theme-provider">
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    theme: String,
  },
  setup() {
    const themes = {
      light: {
        color: '#444',
        background: '#fff',
      },
      dark: {
        color: '#fff',
        background: '#444',
      },
    };

    return {
      themes,
    };
  },
};
</script>

<style lang="scss">
.theme-provider {
  min-height: 100%;
  padding: 60px 0;
}
</style>
