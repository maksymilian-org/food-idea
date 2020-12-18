<template>
  <teleport to="body">
    <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="$emit('close')"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    title: String,
  },
  emits: ['close'],
};
</script>

<style lang="scss" scoped>
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
