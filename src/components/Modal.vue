<template>
  <Teleport to="body">
    <div v-if="modalIsOpen" class="modal">
      <slot></slot>
      <div class="modal__actions">
        <button class="modal__actions-cancel" @click="$emit('close')">
          Cancel
        </button>
        <button
          :type="confirmType"
          class="modal__actions-confirm"
          @click="$emit('confirm')"
        >
          Confirm
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import type { PropType, ButtonHTMLAttributes } from "vue";

export default {
  name: "Modal",
  props: {
    modalIsOpen: {
      type: Boolean,
      required: true,
    },
    confirmType: {
      type: String as PropType<ButtonHTMLAttributes["type"]>,
      default: "button",
    },
  },
  emits: ["close", "confirm"],
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 999;
  top: 25%;
  left: 50%;
  width: 300px;
  height: auto;
  max-height: 70vh;
  translate: -150px;
  padding: 10px;
  background-color: var(--light);
  border: 2px solid var(--dark);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    margin-top: 20px;

    &-cancel {
      border: 2px solid var(--alert);
      background-color: var(--light);

      &:hover {
        background-color: var(--alert);
        color: var(--light);
      }
    }

    &-confirm {
      border: 2px solid var(--success);
      background-color: var(--light);

      &:hover {
        background-color: var(--success);
        color: var(--light);
      }
    }
  }
}
</style>
